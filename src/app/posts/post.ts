export interface PostTag {
  readonly slug: string;
  readonly label: string;
}

export interface Post {
  readonly slug: string;
  readonly title: string;
  readonly date: string;
  readonly description: string;
  readonly tags: readonly PostTag[];
  readonly titleLogo?: string;
  readonly html: string;
}
