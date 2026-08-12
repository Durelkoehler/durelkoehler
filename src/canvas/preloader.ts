/**
 * Tiered progressive frame preloader for HTML5 Canvas scrollytelling.
 * Division of frames:
 * - Tier 1: Essential initial frames (0-25) for immediate Hero section interaction.
 * - Tier 2: Remaining frames (26-125) loaded progressively in background chunks.
 */
export class FramePreloader {
  private images: (HTMLImageElement | null)[] = [];
  private totalFrames: number;
  private onFrameLoaded: (index: number) => void;
  private onAllLoaded: () => void;
  private loadedCount = 0;
  private isDestroyed = false;
  private fallbackTimer: number | null = null;

  constructor(
    totalFrames: number,
    onFrameLoaded: (index: number) => void,
    onAllLoaded: () => void
  ) {
    this.totalFrames = totalFrames;
    this.onFrameLoaded = onFrameLoaded;
    this.onAllLoaded = onAllLoaded;
    this.images = new Array(totalFrames).fill(null);
  }

  /**
   * Starts preloading images in progressive tiers.
   */
  public startPreload(framePath: (index: number) => string) {
    const tier1Indexes = Array.from({ length: 26 }, (_, i) => i); // Frames 0 to 25
    const tier2Indexes = Array.from({ length: this.totalFrames - 26 }, (_, i) => i + 26); // Frames 26 to 125

    let tier1LoadedCount = 0;
    const tier1Total = tier1Indexes.length;

    this.fallbackTimer = window.setTimeout(() => {
      if (this.isDestroyed) return;
      this.onAllLoaded();
    }, 1800);

    const loadSingleFrame = (index: number, isTier1: boolean) => {
      if (this.isDestroyed) return;

      const img = new Image();
      img.src = framePath(index);
      img.onload = () => {
        if (this.isDestroyed) return;
        this.images[index] = img;
        this.loadedCount++;
        this.onFrameLoaded(index);

        if (isTier1) {
          tier1LoadedCount++;
          if (tier1LoadedCount === tier1Total) {
            // Once Tier 1 is fully cached, trigger background loading of Tier 2
            this.preloadTier2(tier2Indexes, framePath);
          }
        }

        if (this.loadedCount === this.totalFrames) {
          this.onAllLoaded();
        }
      };
      img.onerror = () => {
        if (this.isDestroyed) return;
        this.images[index] = null;
        console.error(`[Preloader] Failed to load frame ${index}`);
        if (this.loadedCount === 0 && index === 0) {
          this.onAllLoaded();
        }
      };
    };

    // Begin immediate load of priority frames
    tier1Indexes.forEach((idx) => loadSingleFrame(idx, true));
  }

  /**
   * Preloads remaining frames in chunks utilizing requestIdleCallback
   * to avoid blocking the main thread.
   */
  private preloadTier2(indexes: number[], framePath: (index: number) => string) {
    if (this.isDestroyed || indexes.length === 0) return;

    const chunkSize = 5;
    let currentIndex = 0;

    const loadNextChunk = () => {
      if (this.isDestroyed || currentIndex >= indexes.length) return;

      const scheduleCallback =
        typeof window !== "undefined" && "requestIdleCallback" in window
          ? (window as unknown as { requestIdleCallback: (callback: () => void) => void }).requestIdleCallback
          : (cb: () => void) => setTimeout(cb, 50);

      scheduleCallback(() => {
        const limit = Math.min(currentIndex + chunkSize, indexes.length);
        for (let i = currentIndex; i < limit; i++) {
          const index = indexes[i];
          const img = new Image();
          img.src = framePath(index);
          img.onload = () => {
            if (this.isDestroyed) return;
            this.images[index] = img;
            this.loadedCount++;
            this.onFrameLoaded(index);
            if (this.loadedCount === this.totalFrames) {
              this.onAllLoaded();
            }
          };
        }
        currentIndex += chunkSize;
        if (currentIndex < indexes.length) {
          loadNextChunk();
        }
      });
    };

    loadNextChunk();
  }

  /**
   * Retrieves a loaded image frame or the nearest loaded frame as a fallback.
   */
  public getImage(index: number): HTMLImageElement | null {
    if (index < 0 || index >= this.totalFrames) return null;
    if (this.images[index]) return this.images[index];

    // Fallback: scan outward (left and right) to find the nearest loaded frame
    let step = 1;
    while (step < this.totalFrames) {
      if (index - step >= 0 && this.images[index - step]) return this.images[index - step];
      if (index + step < this.totalFrames && this.images[index + step]) return this.images[index + step];
      step++;
    }
    return null;
  }

  /**
   * Releases image objects from memory.
   */
  public destroy() {
    this.isDestroyed = true;
    if (this.fallbackTimer !== null) {
      window.clearTimeout(this.fallbackTimer);
      this.fallbackTimer = null;
    }
    for (let i = 0; i < this.images.length; i++) {
      this.images[i] = null;
    }
    this.images = [];
  }
}
