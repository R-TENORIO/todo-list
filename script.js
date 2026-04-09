// Script principal da To-Do List
// Funcionalidades: adicionar, completar e remover tarefas

document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Carregar tarefas do localStorage
    loadTodos();

    // Submit do formulário
    todoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const taskText = todoInput.value.trim();
        
        if (taskText) {
            addTodo(taskText);
            todoInput.value = '';
            todoInput.focus();
        }
    });

    // Função para adicionar nova tarefa
    function addTodo(text) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${escapeHtml(text)}</span>
            <div class="actions">
                <button class="complete-btn" onclick="toggleComplete(this)">Concluir</button>
                <button class="delete-btn" onclick="deleteTodo(this)">Excluir</button>
            </div>
        `;
        todoList.appendChild(li);
        saveTodos();
    }

    // Função para marcar/desmarcar como concluída
    window.toggleComplete = function(btn) {
        const li = btn.closest('li');
        li.classList.toggle('completed');
        
        if (li.classList.contains('completed')) {
            btn.textContent = 'Desfazer';
        } else {
            btn.textContent = 'Concluir';
        }
        saveTodos();
    };

    // Função para deletar tarefa
    window.deleteTodo = function(btn) {
        const li = btn.closest('li');
        li.style.opacity = '0';
        li.style.transform = 'translateX(100px)';
        setTimeout(() => {
            li.remove();
            saveTodos();
        }, 300);
    };

    // Salvar tarefas no localStorage
    function saveTodos() {
        const todos = [];
        todoList.querySelectorAll('li').forEach(li => {
            todos.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Carregar tarefas do localStorage
    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${escapeHtml(todo.text)}</span>
                <div class="actions">
                    <button class="complete-btn" onclick="toggleComplete(this)">${todo.completed ? 'Desfazer' : 'Concluir'}</button>
                    <button class="delete-btn" onclick="deleteTodo(this)">Excluir</button>
                </div>
            `;
            if (todo.completed) {
                li.classList.add('completed');
            }
            todoList.appendChild(li);
        });
    }

    // Função de segurança para escapar HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});
