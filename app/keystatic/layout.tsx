/** Il pannello si disegna da solo: niente intestazione, piè di pagina o stili del sito. */
export default function KeystaticLayout({ children }: LayoutProps<"/keystatic">) {
  return children;
}
