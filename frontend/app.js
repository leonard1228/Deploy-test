const API = "https://deploy-test-uzhs.onrender.com/users";

function showFeedback(message, type = "success") {
  const feedback = document.getElementById("feedback");
  feedback.textContent = message;
  feedback.className = `feedback feedback-${type}`;
  feedback.style.display = "block";
  setTimeout(() => {
    feedback.style.display = "none";
  }, 3000);
}

async function loadUsers() {
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("No se pudo cargar la lista");
    
    const data = await res.json();
    const list = document.getElementById("list");

    if (data.length === 0) {
      list.innerHTML = "<li>No hay usuarios aún</li>";
      return;
    }

    list.innerHTML = data.map(user => `
      <li class="user-item">
        <div class="user-info">
          <strong>${escapeHtml(user.name)}</strong> - ${escapeHtml(user.email)}
        </div>
        <div class="user-actions">
          <button type="button" class="btn btn-sm btn-edit" data-id="${user.id}" data-name="${user.name}" data-email="${user.email}">Editar</button>
          <button type="button" class="btn btn-sm btn-danger" data-id="${user.id}">Eliminar</button>
        </div>
      </li>
    `).join("");

    attachUserActions();
  } catch (error) {
    console.error(error);
    showFeedback("Error al cargar usuarios", "error");
  }
}

function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

async function createUser(e) {
  e.preventDefault();
  
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !email) {
    showFeedback("El nombre y email son requeridos", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showFeedback("El email no es válido", "error");
    return;
  }

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    });

    if (!res.ok) throw new Error("No se pudo crear el usuario");

    showFeedback("Usuario creado correctamente ✓", "success");
    document.getElementById("createForm").reset();
    await loadUsers();
  } catch (error) {
    console.error(error);
    showFeedback("Error al crear usuario", "error");
  }
}

async function deleteUser(id) {
  if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;

  try {
    const res = await fetch(`${API}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("No se pudo eliminar");
    
    showFeedback("Usuario eliminado ✓", "success");
    await loadUsers();
  } catch (error) {
    console.error(error);
    showFeedback("Error al eliminar usuario", "error");
  }
}

async function editUser(id, oldName, oldEmail) {
  const name = prompt("Nuevo nombre:", oldName);
  if (name === null) return;
  
  const email = prompt("Nuevo email:", oldEmail);
  if (email === null) return;

  if (!name.trim() || !email.trim()) {
    showFeedback("El nombre y email no pueden estar vacíos", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showFeedback("El email no es válido", "error");
    return;
  }

  try {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    });

    if (!res.ok) throw new Error("No se pudo actualizar");
    
    showFeedback("Usuario actualizado ✓", "success");
    await loadUsers();
  } catch (error) {
    console.error(error);
    showFeedback("Error al actualizar usuario", "error");
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function attachUserActions() {
  document.querySelectorAll(".btn-edit").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const name = e.target.dataset.name;
      const email = e.target.dataset.email;
      editUser(id, name, email);
    });
  });

  document.querySelectorAll(".btn-danger").forEach(btn => {
    btn.addEventListener("click", (e) => {
      deleteUser(e.target.dataset.id);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("createForm").addEventListener("submit", createUser);
  document.getElementById("loadBtn").addEventListener("click", loadUsers);
  loadUsers();
});