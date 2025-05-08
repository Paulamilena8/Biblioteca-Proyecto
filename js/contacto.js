/*preguntas frecuentes- expandible */

document.querySelectorAll('.expandible').forEach(article => {
    const button = article.querySelector('.mas');
    button.addEventListener('click', () => {
      article.classList.toggle('expanded');
    });
  });
