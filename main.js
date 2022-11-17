(()=>{"use strict";const e=e=>{const t=()=>e;return{getTitle:t,setTitle:t=>{e=t},toJSON:()=>({title:t()})}},t=e=>{const t=()=>e;let o=[];const c=()=>o;return{toJSON:()=>({projectName:t(),tasks:c()}),setTasks:e=>{o=e},getName:t,setName:t=>{e=t},getTasks:c,addTask:e=>{o.push(e)}}},o={getTodoList:()=>{const o=Object.assign((()=>{let e=[];e.push(t("Todos")),e.push(t("Today")),e.push(t("This week"));const o=()=>e;return{toJSON:()=>({projects:o()}),getProjects:o,getProject:t=>e.find((e=>e.getName()===t)),addProject:t=>{e.push(t)},setProjects:t=>{e=t}}})(),JSON.parse(localStorage.getItem("todoList")));return null!==localStorage.getItem("todoList")?(o.setProjects(o.projects.map((e=>Object.assign(t(),e)))),o.getProjects().forEach((e=>e.setName(e.projectName))),o.getProjects().forEach((t=>{t.setTasks(t.tasks.map((t=>Object.assign(e(),t))))})),o.getProjects().forEach((e=>{e.getTasks().forEach((e=>e.setTitle(e.title)))}))):(o.setProjects(o.getProjects().map((e=>Object.assign(t(),e)))),o.getProjects().forEach((t=>t.setTasks(t.getTasks().map((t=>Object.assign(e(),t))))))),o},saveTodoList:e=>{localStorage.setItem("todoList",JSON.stringify(e))},addTask:(e,t)=>{const c=o.getTodoList();c.getProject(e).addTask(t),o.saveTodoList(c)},addProject:e=>{const t=o.getTodoList();t.addProject(e),o.saveTodoList(t)}},c=o,s={loadProjectContent:e=>{document.querySelector("#content").innerHTML=`\n        <div id="content-title">${e}</div>\n        <div id="content-body"></div>`;const t=document.querySelector("#content-body");t.appendChild(s.loadTasks(e)),"Today"!==e&&"This week"!==e&&(t.appendChild(s.createAddTaskButton()),t.appendChild(s.createAddTaskPopup(e))),s.loadProjects(),s.closeProjectPopup()},createAddTaskButton:()=>{const e=document.createElement("button");return e.classList.add("add-task-btn"),e.textContent="Add Task",e.addEventListener("click",s.openTaskPopup),e},createAddTaskPopup:e=>{const t=document.createElement("div"),o=document.createElement("input"),c=document.createElement("div"),n=document.createElement("button"),d=document.createElement("button");return n.textContent="ADD",d.textContent="CANCEL",t.classList.add("task-popup"),o.classList.add("task-popup-title"),c.classList.add("task-popup-btns"),n.classList.add("task-popup-add-btn"),d.classList.add("task-popup-cancel-btn"),n.addEventListener("click",(()=>{const t=document.querySelector(".task-popup-title").value;s.addTask(e,t)})),d.addEventListener("click",s.closeTaskPopup),t.appendChild(o),t.appendChild(c),c.appendChild(n),c.appendChild(d),t.style.display="none",t},addTask:(t,o)=>{c.addTask(t,e(o)),s.closeTaskPopup(),s.createNewTask(o)},createNewTask:e=>{const t=document.querySelector(".tasks"),o=document.createElement("div");o.textContent=e,t.appendChild(o)},loadTasks:e=>{const t=document.createElement("div");return t.classList.add("tasks"),c.getTodoList().getProject(e).getTasks().forEach((e=>{const o=document.createElement("div");o.textContent=e.title,t.appendChild(o)})),t},openTaskPopup:()=>{const e=document.querySelector(".add-task-btn"),t=document.querySelector(".task-popup");e.style.display="none",t.style.display="flex"},closeTaskPopup:()=>{const e=document.querySelector(".add-task-btn"),t=document.querySelector(".task-popup"),o=document.querySelector(".task-popup-title");e.style.display="block",t.style.display="none",o.value=""},addProject:()=>{const e=document.querySelector(".project-popup-input").value;c.addProject(t(e)),s.createNewProject(e),s.closeProjectPopup()},createNewProject:e=>{const t=document.querySelector(".projects-container"),o=document.createElement("button");o.textContent=e,o.classList.add("project"),o.addEventListener("click",(()=>{s.loadProjectContent(e)})),t.appendChild(o)},loadProjects:()=>{const e=document.querySelector(".projects-container");e.textContent="",c.getTodoList().getProjects().forEach((t=>{if("Todos"!==t.getName()&&"Today"!=t.getName()&&"This week"!=t.getName()){const o=document.createElement("button");o.textContent=t.getName(),o.classList.add("project-btn"),o.addEventListener("click",(()=>{s.loadProjectContent(t.getName())})),e.appendChild(o)}}))},openProjectPopup:()=>{const e=document.querySelector(".add-project-btn"),t=document.querySelector(".project-popup");e.style.display="none",t.style.display="flex"},closeProjectPopup:()=>{const e=document.querySelector(".add-project-btn"),t=document.querySelector(".project-popup"),o=document.querySelector(".project-popup-input");e.style.display="block",t.style.display="none",o.value=""}};document.querySelectorAll(".project-btn").forEach((e=>{const t=e.textContent;e.addEventListener("click",(()=>{s.loadProjectContent(t)}))})),document.querySelector(".add-project-btn").addEventListener("click",s.openProjectPopup),document.querySelector(".project-popup-add-btn").addEventListener("click",s.addProject),document.querySelector(".project-popup-cancel-btn").addEventListener("click",s.closeProjectPopup);const n=s;document.addEventListener("DOMContentLoaded",n.loadProjectContent("Todos"))})();