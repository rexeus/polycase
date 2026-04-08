/**
 * Error thrown when polycase encounters an invalid runtime usage.
 *
 * @example
 * ```ts
 * throw new PolycaseError("Unsupported case name: 'invalid'")
 * ```
 */
export class PolycaseError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "PolycaseError";
  }
}
