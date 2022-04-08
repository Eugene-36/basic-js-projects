const getTemplate = (data = [], placeholder, selectedId) => {
  let text = placeholder ?? 'Placeholder по умолчанию';

  const items = data.map((item) => {
    let cls = '';
    if (item.id === selectedId) {
      text = item.value;
      cls = 'selected';
    }
    return `
      <li class="select__item ${cls}" data-type="item" data-value="${item.id}">${item.value}</li>
      `;
  });
  return `
  <div class="select__backdrop" data-type="backdrop"></div>
    <div class="select__input" data-type="input">
    <span data-type="text">${text}</span>
    <i class="fa fa-chevron-down" data-type="arrow"></i>
  </div>
  <div class="select__dropdown">
    <ul class="select__list">
      ${items.join('')}
    </ul>
  </div>
    `;
};

export class Select {
  constructor(selector, options) {
    this.$el = document.getElementById(selector);
    this.options = options;
    this.selectedId = null;
    this.selectedId = options.selectedId;
    this.#render();
    this.#setup();
  }

  #render() {
    const { data, placeholder } = this.options;

    this.$el.classList.add('select');
    this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId);
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);

    this.$arrow = this.$el.querySelector('[data-type="arrow"]');
    this.$text = this.$el.querySelector('[data-type="text"]');
  }

  clickHandler(event) {
    const { type } = event.target.dataset;
    if (type === 'input') {
      this.toggle();
    } else if (type === 'item') {
      const id = event.target.dataset.value;

      this.select(id);
    } else if (type === 'backdrop') {
      this.close();
    }
  }

  get isOpen() {
    return this.$el.classList.contains('open');
  }

  get current() {
    return this.options.data.find((item) => item.id === this.selectedId);
  }

  select(id) {
    this.selectedId = id;
    this.$text.textContent = this.current.value;

    console.log('current value', id);

    this.$el.querySelectorAll('[data-type="item"]').forEach((item) => {
      item.classList.remove('selected');
    });
    this.$el.querySelector(`[data-value="${id}"]`).classList.add('selected');

    this.options.onSelected ? this.options.onSelected(this.current) : null;
    this.close();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.$el.classList.add('open');
    this.$arrow.classList.remove('fa-chevron-down');
    this.$arrow.classList.add('fa-chevron-up');
  }

  close() {
    this.$el.classList.remove('open');

    this.$arrow.classList.remove('fa-chevron-up');
    this.$arrow.classList.add('fa-chevron-down');
  }

  destroy() {
    this.$el.removeEventListener('click', this.clickHandler);

    this.$el.innerHTML = '';
  }
}
