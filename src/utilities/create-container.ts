export function createContainer(name: string) {
  const container = document.createElement('div');

  container.id = name;
  document.body.appendChild(container);

  return container;
}
