(()=>{"use strict";const e=e=>{const t=()=>e;return{getTitle:t,toJSON:()=>t()}},t=e=>{const t=()=>e;return{getTitle:t,toJSON:()=>t()}},o=e=>{const o=()=>e;let n=[t("wow"),t("no")];return{setTasks:e=>{n=e},getName:o,getTasks:()=>n,addTask:e=>{n.push(e)},toJSON:()=>o()}},n={getTodoList:()=>{const t=Object.assign((()=>{let e=[];return e.push(o("Todos")),e.push(o("Today")),e.push(o("This week")),{getProjects:()=>e,getProject:t=>e.find((e=>e.getName()===t)),addProject:t=>{e.push(t)},setProjects:t=>{e=t}}})(),JSON.parse(localStorage.getItem("todoList")));return t.setProjects(t.getProjects().map((e=>Object.assign(o(),e)))),t.getProjects().forEach((t=>t.setTasks(t.getTasks().map((t=>Object.assign(e(),t)))))),console.log(t),t},saveTodoList:e=>{localStorage.setItem("todoList",JSON.stringify(e));const t=o("harry");console.log(JSON.stringify(t))},addTask:(e,t)=>{const o=n.getTodoList();o.getProject(e).addTask(t),n.saveTodoList(o)},addProject:e=>{const t=n.getTodoList();t.addProject(e),n.saveTodoList(t)}},d=n,s={loadHome:()=>{s.loadProjectContent("Todos"),s.closeProjectPopup()},loadToday:()=>{s.loadProjectContent("Today"),s.closeProjectPopup()},loadThisWeek:()=>{s.loadProjectContent("This week"),s.closeProjectPopup()},loadProjectContent:e=>{const t=document.querySelector("#content");t.innerHTML=`\n        <div id="content-title">${e}</div>`;const o=document.createElement("div");o.setAttribute("id","content-body"),o.appendChild((e=>{const t=document.createElement("div");return t.classList.add("tasks"),d.getTodoList().getProject(e).getTasks().forEach((e=>{const o=document.createElement("div");o.innerHTML=e.getTitle(),t.appendChild(o)})),t})(e)),t.appendChild(o),"Today"!==e&&"This week"!==e&&(o.appendChild(s.addTaskButton()),o.appendChild(s.addTaskPopup(e)))},addTaskButton:()=>{const e=document.createElement("button");return e.classList.add("add-task-btn"),e.textContent="Add Task",e.addEventListener("click",s.openTaskPopup),e},addTaskPopup:t=>{const o=document.createElement("div"),n=document.createElement("input"),c=document.createElement("div"),a=document.createElement("button"),l=document.createElement("button");return a.textContent="ADD",l.textContent="CANCEL",o.classList.add("task-popup"),n.classList.add("task-popup-title"),c.classList.add("task-popup-btns"),a.classList.add("task-popup-add-btn"),l.classList.add("task-popup-cancel-btn"),a.addEventListener("click",(()=>{const o=document.querySelector("#content"),n=document.querySelector(".task-popup-title").value;d.addTask(t,e(n)),s.closeTaskPopup(),o.textContent="",s.loadProjectContent(t)})),l.addEventListener("click",s.closeTaskPopup),o.appendChild(n),o.appendChild(c),c.appendChild(a),c.appendChild(l),o.style.display="none",o},openTaskPopup:()=>{const e=document.querySelector(".add-task-btn"),t=document.querySelector(".task-popup");e.style.display="none",t.style.display="flex"},closeTaskPopup:()=>{const e=document.querySelector(".add-task-btn"),t=document.querySelector(".task-popup");e.style.display="block",t.style.display="none"},openProjectPopup:()=>{const e=document.querySelector(".add-project-btn"),t=document.querySelector(".project-popup");e.style.display="none",t.style.display="flex"},closeProjectPopup:()=>{const e=document.querySelector(".add-project-btn"),t=document.querySelector(".project-popup");e.style.display="block",t.style.display="none"}};document.querySelector("#todos-btn").addEventListener("click",s.loadHome),document.querySelector("#today-btn").addEventListener("click",s.loadToday),document.querySelector("#this-week-btn").addEventListener("click",s.loadThisWeek),document.querySelector(".add-project-btn").addEventListener("click",s.openProjectPopup),document.querySelector(".project-popup-cancel-btn").addEventListener("click",s.closeProjectPopup);const c=s;document.addEventListener("DOMContentLoaded",c.loadHome)})();