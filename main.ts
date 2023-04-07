import { writeFile } from "fs/promises";
import { render } from "./render.ts";
import { loadUsers } from "./users.ts";

const users = await loadUsers(100);
// ver por consola lo que retorna users
const html = render(users);
// ver por consola el objeto html   
console.log(html);
await writeFile('users.html', html);

