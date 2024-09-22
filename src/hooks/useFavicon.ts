export default function useFavicon(newFavIcon: string) {
  var link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;

  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = newFavIcon;
}
