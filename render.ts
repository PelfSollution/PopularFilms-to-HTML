import { User } from "./users.ts";

const head = (title: string) => `
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>


    body {
      display: flex;
      flex-wrap: wrap;
     
    }
    
    .content {
      flex-basis: calc(50% - 20px);
      margin: 10px;
    }

    .user {
      font-family: sans-serif;
      display: flex;
      flex-direction: row;
      align-items: right;
      padding: .4rem;
      border-bottom: 1px solid #ddd;
    }
    .user img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      margin-right: 0.7rem;
    }
    .user .name {
      font-weight: bold;
    }
    .user .email {
      font-family: monospace;
      font-size:11px;
      color:blue;
    }

    .user .location{
      color: #666;
      font-size: 11px;
    }

  </style>
</head>`;

const renderUsers = (users: Array<User>) => {
  let html = "";
  for (const user of users) {
    html += `<div class="content">
    <div class="user">
      <img src="${user.picture.medium}" />
      <div class="data">
        <div class="name">${user.fullName}</div>
        <a href="mailto:${user.email}" class="email" >${user.email}</a>
        <div class="location">${user.location.city}</div>
      </div>
    </div>
  </div>`;
  }
  return html;
}

export const render = (users: Array<User>) => {
  const title = `Lista de ${users.length} Usuarios`
  return `
<html>
  ${head(title)}
  <body>
    ${renderUsers(users)}
  </body>
</html>`;
};
