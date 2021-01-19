/**
 * Options for current field
 */
export interface PublicFieldOptions {
  /**
   * If provided, field will public only if extractPublicFields will called with args[condition] is true
   */
  condition?: string;
}
