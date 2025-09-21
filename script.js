    let tombol = document.getElementById("tombol");
    let input = document.getElementById("taskInput");
    let subjectInput = document.getElementById("subjectInput");
    let dateInput = document.getElementById("dateInput");
    let list = document.getElementById("list");
    let hideBtn = document.getElementById("hideDoneTasks");

    let hideDone = false;

    function checkDoneTasks() {
      let anyDone = Array.from(document.querySelectorAll("#list input[type='checkbox']")).some(cb => cb.checked);
      hideBtn.style.display = anyDone ? "inline" : "none";
    }

    function TugasBaru() {
      let taskText = input.value.trim();
      let subject = subjectInput.value.trim();
      let date = dateInput.value;

      if (taskText === "" || subject === "" || date === "") {
        alert("Semua inputan harus diisi!");
        return;
      }
      
      let taskRow = document.createElement("div");
      taskRow.classList.add("task-row");

      let leftSide = document.createElement("div");
      leftSide.classList.add("d-flex", "flex-column");

      let checkContainer = document.createElement("div");
      checkContainer.classList.add("d-flex", "align-items-center");

      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("form-check-input");

      let label = document.createElement("label");
      label.classList.add("task-label", "ms-2");
      label.innerText = taskText;

      checkContainer.append(checkbox, label);

      let meta = document.createElement("div");
      meta.classList.add("task-meta", "ms-4");
      let meta2 = document.createTextNode(`Pelajaran: ${subject} | Deadline: ${date}`);
      meta.appendChild(meta2);

      checkbox.addEventListener("change", function () {
        if (this.checked) {
          label.classList.add("task-done");
          taskRow.style.display = hideDone ? "none" : "flex";
        } else {
          label.classList.remove("task-done");
          taskRow.style.display = "flex";
        }
        checkDoneTasks();
      });

      leftSide.append(checkContainer, meta);

      let deleteBtn = document.createElement("i");
      deleteBtn.classList.add("bi", "bi-trash", "delete-btn");
      deleteBtn.addEventListener("click", function () {
        let confirmDelete = confirm("Yakin mau hapus tugas ini? 🗑");
        if (confirmDelete) {
          taskRow.classList.add("fade-out");
          setTimeout(() => {
            list.removeChild(taskRow);
            checkDoneTasks();
          }, 300);
        }
      });

      taskRow.append(leftSide, deleteBtn);
      list.insertBefore(taskRow, list.firstChild);

      input.value = "";
      subjectInput.value = "";
      dateInput.value = "";
    }

    tombol.addEventListener("click", TugasBaru);

    input.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        TugasBaru();
      }
    });

    hideBtn.addEventListener("click", function () {
      hideDone = !hideDone;
      hideBtn.innerText = hideDone ? "Tampilkan tugas yang selesai" : "Sembunyikan tugas yang selesai";
      document.querySelectorAll(".task-row").forEach(row => {
        let checkbox = row.querySelector("input[type='checkbox']");
        if (checkbox.checked) {
          row.style.display = hideDone ? "none" : "flex";
        }
      });
    });
  </script>
