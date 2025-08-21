'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
      resolve();
    }
  });

  setTimeout(() => {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject();
  }, 3000);
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener('mousedown', () => {
    resolve();
  });
});

const thirdPromise = new Promise((resolve) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('contextmenu', (e) => e.preventDefault());

  document.addEventListener('mousedown', (e) => {
    e.preventDefault();

    if (e.button === 0) {
      leftClicked = true;
    }

    if (e.button === 2) {
      rightClicked = true;
    }

    if (leftClicked && rightClicked) {
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    const resolveMessage = createMessage(
      'success',
      'First promise was resolved',
    );

    document.body.append(resolveMessage);
  })
  .catch(() => {
    const rejectMessage = createMessage('error', 'First promise was rejected');

    document.body.append(rejectMessage);
  });

secondPromise.then(() => {
  const resolveMessage = createMessage(
    'success',
    'Second promise was resolved',
  );

  document.body.append(resolveMessage);
});

thirdPromise.then(() => {
  const resolveMessage = createMessage('success', 'Third promise was resolved');

  document.body.append(resolveMessage);
});

function createMessage(type, promiseMsg) {
  const message = document.createElement('div');

  message.setAttribute('data-qa', 'notification');
  message.classList = `${type}`;
  message.textContent = promiseMsg;

  return message;
}
