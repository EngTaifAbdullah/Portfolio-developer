function scrollProjects(direction) {
  const container = document.getElementById("projectsContainer");
  container.scrollBy({
    left: direction * 800,
    behavior: "smooth"
  });
}