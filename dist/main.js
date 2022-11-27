(()=>{"use strict";const t=(t,e,o)=>{const s=()=>t,n=()=>e,a=()=>o;return{getTitle:s,setTitle:e=>{t=e},getDate:n,setDate:t=>{e=t},getStatus:a,setStatus:t=>{o=t},toJSON:()=>({title:s(),dueDate:n(),status:a()}),getDateFormatted:()=>{const t=e.split("-")[0];return`${e.split("-")[1]}/${e.split("-")[2]}/${t}`}}};function e(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function o(t){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}function s(t){e(1,arguments);var s=Object.prototype.toString.call(t);return t instanceof Date||"object"===o(t)&&"[object Date]"===s?new Date(t.getTime()):"number"==typeof t||"[object Number]"===s?new Date(t):("string"!=typeof t&&"[object String]"!==s||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}function n(t){e(1,arguments);var o=s(t);return o.setHours(0,0,0,0),o}function a(t,o){e(2,arguments);var s=n(t),a=n(o);return s.getTime()===a.getTime()}const c=t=>{const e=()=>t;let o=[];const s=()=>o;return{toJSON:()=>({projectName:e(),tasks:s()}),setTasks:t=>{o=t},getName:e,setName:e=>{t=e},getTasks:s,getTask:t=>o.find((e=>e.getTitle()===t)),contains:t=>o.some((e=>e.getTitle()===t)),addTask:t=>{o.push(t)},deleteTask:t=>{o=o.filter((e=>e.getTitle()!==t))}}},d={getTodoList:()=>{const e=Object.assign((()=>{let t=[];t.push(c("Home")),t.push(c("Today")),t.push(c("This week"));const e=()=>t;return{toJSON:()=>({projects:e()}),getProjects:e,getProject:e=>t.find((t=>t.getName()===e)),addProject:e=>{t.push(e)},setProjects:e=>{t=e},deleteProject:e=>{t=t.filter((t=>t.getName()!==e))}}})(),JSON.parse(localStorage.getItem("todoList")));return null!==localStorage.getItem("todoList")?(e.setProjects(e.projects.map((t=>Object.assign(c(),t)))),e.getProjects().forEach((t=>t.setName(t.projectName))),e.getProjects().forEach((e=>{e.setTasks(e.tasks.map((e=>Object.assign(t(),e))))})),e.getProjects().forEach((t=>{t.getTasks().forEach((t=>{t.setTitle(t.title),t.setDate(t.dueDate),t.setStatus(t.status)}))}))):(e.setProjects(e.getProjects().map((t=>Object.assign(c(),t)))),e.getProjects().forEach((e=>e.setTasks(e.getTasks().map((e=>Object.assign(t(),e))))))),e},saveTodoList:t=>{localStorage.setItem("todoList",JSON.stringify(t))},addTask:(t,e)=>{const o=d.getTodoList();o.getProject(t).addTask(e),d.saveTodoList(o)},addProject:t=>{const e=d.getTodoList();e.addProject(t),d.saveTodoList(e)},setTask:(t,e,o,s)=>{const n=d.getTodoList();n.getProject(t).getTask(e).setDate(s),n.getProject(t).getTask(e).setTitle(o),d.saveTodoList(n)},changeTaskStatus:(t,e,o)=>{const s=d.getTodoList();s.getProject(t).getTask(e).setStatus(o),d.saveTodoList(s)},deleteProject:t=>{const e=d.getTodoList();e.deleteProject(t),d.saveTodoList(e)},deleteTask:(t,e)=>{const o=d.getTodoList();o.getProject(t).deleteTask(e),d.saveTodoList(o)},updateTodayTasks:()=>{const t=d.getTodoList(),o=t.getProjects().map((t=>({projectName:t.getName(),tasks:t.getTasks().filter((t=>function(t){return e(1,arguments),a(t,Date.now())}(new Date(t.getDate()))))})));t.getProject("Today").setTasks([]),o.filter((t=>"Today"!==t.projectName)).forEach((e=>{e.tasks.forEach((e=>{t.getProject("Today").addTask(e)}))})),d.saveTodoList(t)}},r=d,l={loadHomePage:()=>{l.loadProjects(),l.initAddProjectButtons(),l.openProject("Home",document.getElementById("home-btn"))},loadProjects:()=>{r.getTodoList().getProjects().forEach((t=>{"Home"!==t.getName()&&"Today"!==t.getName()&&"This week"!==t.getName()&&l.createNewProject(t.getName())})),l.initProjectButtons()},loadProjectContent:t=>{document.querySelector("#content").innerHTML=`\n        <div id="content-title">${t}</div>\n        <div id="content-body">\n          <div class="tasks-list"></div>\n        </div>`;const e=document.querySelector("#content-body");"Today"!==t&&"This week"!==t&&(e.innerHTML+='\n                <button class="add-task-btn">\n                  Add Task\n                </button>\n                <div class="task-popup" style="display: none">\n                  <input placeholder="Title" class="task-popup-title">\n                  <input type="date" class="task-popup-date">\n                  <div class="task-popup-btns">\n                    <button class="task-popup-add-btn">\n                      ADD\n                    </button>\n                    <button class="task-popup-cancel-btn">\n                      CANCEL\n                    </button>\n                  </div>\n                </div>'),l.loadTasks(t)},loadHomeTasks:t=>{l.openProject("Home",t.currentTarget)},loadTodayTasks:t=>{r.updateTodayTasks(),l.openProject("Today",t.currentTarget)},loadThisWeekTasks:t=>{l.openProject("This week",t.currentTarget)},createNewProject:t=>{document.querySelector(".projects-list").innerHTML+=`\n    <div class="project">\n      <button class="project-btn">\n        <span>${t}</span>\n        <span class="project-delete-btn">x</span>\n      </button>\n      \n    </div>\n    `,l.initProjectButtons()},openProject:(t,e)=>{const o=document.querySelectorAll("button");l.loadProjectContent(t),o.forEach((t=>{t.classList.remove("active")})),e.classList.add("active")},addProject:()=>{const t=document.querySelector(".project-popup-input").value,e=c(t);r.addProject(e),l.createNewProject(e.getName()),l.closeProjectPopup()},deleteProject:(t,e)=>{e.classList.contains("active")&&l.clearProjectContent(),r.deleteProject(t),e.parentNode.remove()},clearProjects:()=>{document.querySelector(".projects-list").textContent=""},clearProjectContent:()=>{document.querySelector("#content").textContent=""},openProjectPopup:()=>{const t=document.querySelector(".add-project-btn"),e=document.querySelector(".project-popup");t.style.display="none",e.style.display="flex"},closeProjectPopup:()=>{const t=document.querySelector(".add-project-btn"),e=document.querySelector(".project-popup"),o=document.querySelector(".project-popup-input");t.style.display="block",e.style.display="none",o.value=""},loadTasks:t=>{r.getTodoList().getProject(t).getTasks().forEach((t=>{l.createNewTask(t)})),"Today"!==t&&"This week"!==t&&l.initAddTaskButtons()},createNewTask:t=>{const e=document.querySelector("#content-title").textContent,o=document.querySelector(".tasks-list"),s=document.createElement("div"),n=r.getTodoList().getProject(e).getTask(t.getTitle()).getStatus();s.classList.add("task"),"ongoing"===n?(s.classList.remove("completed"),s.innerHTML+='<input type="checkbox" class="task-checkbox">'):(s.classList.add("completed"),s.innerHTML+='<input type="checkbox" class="task-checkbox" checked>'),s.innerHTML+=`\n        <p class="task-title">${t.getTitle()}</p>\n        <p class="task-due-date">${t.getDateFormatted()}</p>\n        <button class="edit-task-btn">Edit</button>\n        <button class="delete-task-btn">Delete</button>\n      `,s.appendChild(l.createEditTaskPopup(t)),o.appendChild(s),l.initTaskButtons()},createEditTaskPopup:t=>{const e=document.createElement("div");return e.classList.add("edit-task-popup"),e.innerHTML+=`\n      <input type="text" value="${t.getTitle()}" class="edit-task-task-title">\n      <input type="date" value="${t.getDate()}" class="edit-task-task-due-date">\n      <div class="edit-task-popup-buttons">\n        <button class="edit-task-save-btn">Save</button>\n        <button class="edit-task-cancel-btn">Cancel</button>\n      </div>\n    `,e},addTask:()=>{const e=document.querySelector("#content-title").textContent,o=document.querySelector(".task-popup-title").value,s=document.querySelector(".task-popup-date").value,n=t(o,s,"ongoing");""!==o&&""!==s?(r.addTask(e,n),l.closeTaskPopup(),l.createNewTask(n)):alert("Fields must be complete")},editTask:t=>{const e=document.querySelector("#content-title").textContent,o=[...t.target.parentNode.parentNode.parentNode.children],s=o.find((t=>t.classList.contains("edit-task-popup"))),n=o.find((t=>t.classList.contains("task-title"))).textContent,a=[...s.children].find((t=>t.classList.contains("edit-task-task-title"))).value,c=[...s.children].find((t=>t.classList.contains("edit-task-task-due-date"))).value;r.setTask(e,n,a,c),l.closeEditTaskPopup(),l.clearTasks(),l.loadTasks(e)},deleteTask:t=>{const e=document.querySelector("#content-title").textContent,o=t.target.parentNode.children[1].textContent;r.deleteTask(e,o),l.clearTasks(),l.loadTasks(e)},changeTaskStatus:t=>{const e=document.querySelector("#content-title").textContent,o=t.target.parentNode,s=o.children[1].textContent;t.target.checked?(o.classList.add("completed"),r.changeTaskStatus(e,s,"completed")):(o.classList.remove("completed"),r.changeTaskStatus(e,s,"ongoing"))},clearTasks:()=>{document.querySelector(".tasks-list").textContent=""},openEditTaskPopup:t=>{const e=[...t.target.parentNode.children],o=e.find((t=>t.classList.contains("edit-task-popup"))),s=[...o.children].find((t=>t.classList.contains("edit-task-popup-buttons"))),n=[...s.children].find((t=>t.classList.contains("edit-task-save-btn"))),a=[...s.children].find((t=>t.classList.contains("edit-task-cancel-btn")));e.forEach((t=>{t!==o&&(t.style.display="none")})),o.style.display="flex",a.addEventListener("click",l.closeEditTaskPopup),n.addEventListener("click",l.editTask),l.hideTaskButtons()},closeEditTaskPopup:()=>{document.querySelectorAll(".task").forEach((t=>{[...t.children].forEach((t=>{t.classList.contains("edit-task-popup")?t.style.display="none":t.style.display=""}))})),l.showTaskButtons()},hideTaskButtons:()=>{const t=document.querySelector(".add-task-btn"),e=document.querySelectorAll(".edit-task-btn"),o=document.querySelectorAll(".delete-task-btn");t.style.display="none",e.forEach((t=>{t.style.display="none"})),o.forEach((t=>{t.style.display="none"}))},showTaskButtons:()=>{const t=document.querySelector(".add-task-btn"),e=document.querySelectorAll(".edit-task-btn"),o=document.querySelectorAll(".delete-task-btn");t.style.display="",e.forEach((t=>{t.style.display=""})),o.forEach((t=>{t.style.display=""}))},openTaskPopup:()=>{const t=document.querySelector(".add-task-btn"),e=document.querySelector(".task-popup");t.style.display="none",e.style.display="flex"},closeTaskPopup:()=>{const t=document.querySelector(".add-task-btn"),e=document.querySelector(".task-popup"),o=document.querySelectorAll(".task-popup>input");t.style.display="block",e.style.display="none",o.forEach((t=>t.value=null))},initAddTaskButtons:()=>{const t=document.querySelector(".add-task-btn"),e=document.querySelector(".task-popup-add-btn"),o=document.querySelector(".task-popup-cancel-btn");t.addEventListener("click",l.openTaskPopup),e.addEventListener("click",l.addTask),o.addEventListener("click",l.closeTaskPopup)},initAddProjectButtons:()=>{const t=document.querySelector(".add-project-btn"),e=document.querySelector(".project-popup-add-btn"),o=document.querySelector(".project-popup-cancel-btn");t.addEventListener("click",l.openProjectPopup),e.addEventListener("click",l.addProject),o.addEventListener("click",l.closeProjectPopup)},initProjectButtons:()=>{const t=document.querySelector("#home-btn"),e=document.querySelector("#today-btn"),o=document.querySelector("#this-week-btn"),s=document.querySelectorAll(".project-btn");t.addEventListener("click",l.loadHomeTasks),e.addEventListener("click",l.loadTodayTasks),o.addEventListener("click",l.loadThisWeekTasks),s.forEach((t=>{t.addEventListener("click",l.handleProjectButtons)}))},initTaskButtons:()=>{const t=document.querySelectorAll(".task-checkbox"),e=document.querySelectorAll(".edit-task-btn"),o=document.querySelectorAll(".delete-task-btn");t.forEach((t=>{t.addEventListener("change",l.changeTaskStatus)})),e.forEach((t=>{t.addEventListener("click",l.openEditTaskPopup)})),o.forEach((t=>{t.addEventListener("click",l.deleteTask)}))},handleProjectButtons:t=>{const e=t.currentTarget,o=e.children[0].textContent;t.target.classList.contains("project-delete-btn")?l.deleteProject(o,e):l.openProject(o,e)}},i=l;document.addEventListener("DOMContentLoaded",i.loadHomePage)})();