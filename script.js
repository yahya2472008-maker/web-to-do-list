// Array Utama untuk menampung data objek tugas
let tasks = [];
let editingIndex = null; // Menyimpan indeks saat mode update/edit

const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const submitBtn = document.getElementById('submitBtn');
const taskStatusCount = document.getElementById('taskStatusCount');

// Fungsi Tambah atau Update Data
function processTask() {
    const text = taskInput.value.trim();
    if (text === '') {
        alert('Kolom tugas tidak boleh kosong!');
        return;
    }

    if (editingIndex === null) {
        // Operasi Create (Tambah data baru ke Array)
        tasks.push({
            text: text,
            completed: false // Menggunakan tipe data boolean awal
        });
    } else {
        // Operasi Update (Memperbarui data dalam Array)
        tasks[editingIndex].text = text;
        editingIndex = null;
        submitBtn.innerText = 'Tambah';
    }

    taskInput.value = '';
    renderApp();
}

// Fungsi Merender Array ke DOM & Update Status Bar
function renderApp() {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = '<p style="text-align: center; color: #94a3b8; font-size: 13px; margin-top: 40px;">Belum ada tugas yang tersimpan.</p>';
    }

    tasks.forEach((task, index) => {
        const item = document.createElement('div');
        item.className = `task-item ${task.completed ? 'completed' : ''}`;

        item.innerHTML = `
            <div class="task-left">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleBoolean(${index})">
                <span>${task.text}</span>
            </div>
            <div class="task-actions">
                <button class="btn-action btn-edit" onclick="editTask(${index})">Edit</button>
                <button class="btn-action btn-delete" onclick="deleteTask(${index})">Hapus</button>
            </div>
        `;
        taskList.appendChild(item);
    });

    // Update teks status bar dinamis
    taskStatusCount.innerText = `Total tugas: ${tasks.length}`;
}

// Fungsi Mengubah Status Boolean (Selesai/Belum) via Ceklis
function toggleBoolean(index) {
    tasks[index].completed = !tasks[index].completed; // Membalik nilai boolean
    renderApp();
}

// Fungsi Hapus Data dari Array (Delete)
function deleteTask(index) {
    tasks.splice(index, 1);
    if (editingIndex === index) {
        editingIndex = null;
        taskInput.value = '';
        submitBtn.innerText = 'Tambah';
    }
    renderApp();
}

// Fungsi Memuat Data ke Form untuk Update (Edit)
function editTask(index) {
    taskInput.value = tasks[index].text;
    editingIndex = index;
    submitBtn.innerText = 'Update';
    taskInput.focus();
}

// Jalankan render awal saat dimuat
renderApp();