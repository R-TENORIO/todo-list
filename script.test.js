// Testes unitários para a lógica da To-Do List
// Rodar com: npm test

// Simula o ambiente do DOM para os testes
document.body.innerHTML = `
  <form id="todo-form">
    <input type="text" id="todo-input" />
    <button type="submit">Adicionar</button>
  </form>
  <ul id="todo-list"></ul>
`;

// Recria o script principal para testes
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Função para adicionar nova tarefa
todoForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const taskText = todoInput.value.trim();
  
  if (taskText) {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${escapeHtml(taskText)}</span>
      <div class="actions">
        <button class="complete-btn">Concluir</button>
        <button class="delete-btn">Excluir</button>
      </div>
    `;
    todoList.appendChild(li);
    todoInput.value = '';
  }
});

// Função de escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ==========================================
// SUÍTE DE TESTES
// ==========================================

describe('To-Do List - Testes Unitários', () => {
  
  beforeEach(() => {
    todoList.innerHTML = '';
    todoInput.value = '';
  });

  describe('Função de Adicionar Tarefa', () => {
    
    test('deve adicionar nova tarefa quando o formulário é submetido com texto válido', () => {
      todoInput.value = 'Estudar DevOps';
      
      const event = new Event('submit', { bubbles: true, cancelable: true });
      todoForm.dispatchEvent(event);
      
      expect(todoList.children.length).toBe(1);
      expect(todoList.children[0].querySelector('span').textContent).toBe('Estudar DevOps');
    });

    test('deve adicionar múltiplas tarefas corretamente', () => {
      todoInput.value = 'Tarefa 1';
      todoForm.dispatchEvent(new Event('submit', { bubbles: true }));
      
      todoInput.value = 'Tarefa 2';
      todoForm.dispatchEvent(new Event('submit', { bubbles: true }));
      
      expect(todoList.children.length).toBe(2);
    });

    test('não deve adicionar tarefa vazia', () => {
      todoInput.value = '   ';
      todoForm.dispatchEvent(new Event('submit', { bubbles: true }));
      
      expect(todoList.children.length).toBe(0);
    });

    test('deve limpar o input após adicionar tarefa', () => {
      todoInput.value = 'Nova tarefa';
      todoForm.dispatchEvent(new Event('submit', { bubbles: true }));
      
      expect(todoInput.value).toBe('');
    });

    test('deve escapar HTML para prevenir XSS', () => {
      todoInput.value = '<script>alert("XSS")</script>';
      todoForm.dispatchEvent(new Event('submit', { bubbles: true }));
      
      const span = todoList.children[0].querySelector('span');
      expect(span.innerHTML).not.toContain('<script>');
      expect(span.textContent).toBe('<script>alert("XSS")</script>');
    });
  });

  describe('Estrutura da Tarefa', () => {
    
    test('cada tarefa deve ter botão Concluir e Excluir', () => {
      todoInput.value = 'Tarefa de teste';
      todoForm.dispatchEvent(new Event('submit', { bubbles: true }));
      
      const li = todoList.children[0];
      expect(li.querySelector('.complete-btn')).toBeTruthy();
      expect(li.querySelector('.delete-btn')).toBeTruthy();
    });

    test('cada tarefa deve conter o texto no elemento span', () => {
      todoInput.value = 'Minha tarefa';
      todoForm.dispatchEvent(new Event('submit', { bubbles: true }));
      
      const span = todoList.children[0].querySelector('span');
      expect(span).toBeTruthy();
      expect(span.textContent).toBe('Minha tarefa');
    });
  });
});
