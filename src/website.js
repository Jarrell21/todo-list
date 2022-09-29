import './style.css';

function createHeader(){
    const header = document.createElement('header');
    header.classList.add('header');

    const headerTitle = document.createElement('div');
    headerTitle.classList.add('header-title');
    headerTitle.textContent = "Todo List";

    header.appendChild(headerTitle)

    return header;
}

function createMain(){
    const main = document.createElement('main');
    main.classList.add('main');

    main.textContent = 'This is main';

    return main;
}

function createFooter(){
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    footer.textContent = 'This is footer';

    return footer;
}

function initializeWebsite(){
    const body = document.querySelector('body');
    
    body.appendChild(createHeader());
    body.appendChild(createMain());
    body.appendChild(createFooter());
}

export default initializeWebsite;