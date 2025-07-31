document.addEventListener("DOMContentLoaded", function () {
  const switcherIcon = document.getElementById("app-switcher-icon");
  const switcherImg = switcherIcon ? switcherIcon.querySelector("img") : null;

  if (!switcherIcon) {
    console.error("App switcher icon not found!");
    return;
  }

  let switcherParent = switcherIcon.parentElement;
  if (!switcherParent.classList.contains("app-switcher")) {
    const wrapper = document.createElement("div");
    wrapper.className = "app-switcher";
    switcherIcon.parentNode.insertBefore(wrapper, switcherIcon);
    wrapper.appendChild(switcherIcon);
    switcherParent = wrapper;
  }

  const menu = document.createElement("div");
  menu.className = "app-switcher-menu";
  if (document.body.classList.contains("dark-theme") || true) {
    menu.classList.add("dark-theme");
  }

  const title = document.createElement("div");
  title.className = "app-switcher-title";
  title.textContent = "App Switcher";
  menu.appendChild(title);

  const list = document.createElement("ul");
  list.className = "app-switcher-list";

  apps.forEach((app) => {
    const item = document.createElement("li");
    item.className = "app-item";

    const icon = document.createElement("img");
    icon.className = "app-icon";
    icon.src = `assets/logos/${app.icon}`;
    icon.alt = app.name;

    const name = document.createElement("span");
    name.className = "app-name";
    name.textContent = app.name;

    item.appendChild(icon);
    item.appendChild(name);

    item.addEventListener("click", function () {
      window.location.href = app.url;
    });

    list.appendChild(item);
  });

  menu.appendChild(list);
  switcherParent.appendChild(menu);

  switcherIcon.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    // Toggle app switcher menu
    if (e.target === switcherIcon || e.target === switcherImg) {
      menu.classList.toggle("show");

      // Hide the notification menu if it's open
      const notificationMenu = document.querySelector(".notification-menu");
      if (notificationMenu) {
        notificationMenu.classList.remove("show");
      }
    }
  });

  document.addEventListener("click", function (e) {
    if (!switcherParent.contains(e.target)) {
      menu.classList.remove("show");
    }
  });
});
