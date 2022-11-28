(()=>{"use strict";const t=(t,e,o)=>{const s=()=>t,n=()=>e,a=()=>o;return{getTitle:s,setTitle:e=>{t=e},getDate:n,setDate:t=>{e=t},getStatus:a,setStatus:t=>{o=t},toJSON:()=>({title:s(),dueDate:n(),status:a()}),getDateFormatted:()=>{const t=e.split("-")[0];return`${e.split("-")[1]}/${e.split("-")[2]}/${t}`}}};function e(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function o(t){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}function s(t){e(1,arguments);var s=Object.prototype.toString.call(t);return t instanceof Date||"object"===o(t)&&"[object Date]"===s?new Date(t.getTime()):"number"==typeof t||"[object Number]"===s?new Date(t):("string"!=typeof t&&"[object String]"!==s||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn((new Error).stack)),new Date(NaN))}function n(t){e(1,arguments);var o=s(t);return o.setHours(0,0,0,0),o}function a(t,o){e(2,arguments);var s=n(t),a=n(o);return s.getTime()===a.getTime()}function c(t){if(null===t||!0===t||!1===t)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}var d={};function r(){return d}function l(t,o){var n,a,d,l,i,u,p,k;e(1,arguments);var T=r(),y=c(null!==(n=null!==(a=null!==(d=null!==(l=null==o?void 0:o.weekStartsOn)&&void 0!==l?l:null==o||null===(i=o.locale)||void 0===i||null===(u=i.options)||void 0===u?void 0:u.weekStartsOn)&&void 0!==d?d:T.weekStartsOn)&&void 0!==a?a:null===(p=T.locale)||void 0===p||null===(k=p.options)||void 0===k?void 0:k.weekStartsOn)&&void 0!==n?n:0);if(!(y>=0&&y<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var m=s(t),g=m.getDay(),j=(g<y?7:0)+g-y;return m.setDate(m.getDate()-j),m.setHours(0,0,0,0),m}function i(t,o,s){e(2,arguments);var n=l(t,s),a=l(o,s);return n.getTime()===a.getTime()}const u=t=>{const o=()=>t;let s=[];const n=()=>s;return{toJSON:()=>({projectName:o(),tasks:n()}),setTasks:t=>{s=t},getName:o,setName:e=>{t=e},getTasks:n,getTask:t=>s.find((e=>e.getTitle()===t)),contains:t=>s.some((e=>e.getTitle()===t)),addTask:t=>{s.push(t)},deleteTask:t=>{s=s.filter((e=>e.getTitle()!==t))},getTasksToday:()=>s.filter((t=>function(t){return e(1,arguments),a(t,Date.now())}(new Date(t.getDate())))),getTasksThisWeek:()=>s.filter((t=>function(t,o){return e(1,arguments),i(t,Date.now(),o)}(new Date(t.getDate()))))}},p={getTodoList:()=>{const e=Object.assign((()=>{let e=[];e.push(u("Home")),e.push(u("Today")),e.push(u("This week"));const o=()=>e,s=t=>e.find((e=>e.getName()===t));return{toJSON:()=>({projects:o()}),getProjects:o,getProject:s,contains:t=>e.some((e=>e.getName()===t)),addProject:t=>{e.push(t)},setProjects:t=>{e=t},deleteProject:t=>{e=e.filter((e=>e.getName()!==t))},updateTodayProject:()=>{s("Today").setTasks([]),e.forEach((e=>{"Today"!==e.getName()&&"This week"!==e.getName()&&e.getTasksToday().forEach((o=>{const n=`${o.getTitle()} (${e.getName()})`;s("Today").addTask(t(n,o.getDate(),o.getStatus()))}))}))},updateThisWeekProject:()=>{s("This week").setTasks([]),e.forEach((e=>{"Today"!==e.getName()&&"This week"!==e.getName()&&e.getTasksThisWeek().forEach((o=>{const n=`${o.getTitle()} (${e.getName()})`;s("This week").addTask(t(n,o.getDate(),o.getStatus()))}))}))}}})(),JSON.parse(localStorage.getItem("todoList")));return null!==localStorage.getItem("todoList")?(e.setProjects(e.projects.map((t=>Object.assign(u(),t)))),e.getProjects().forEach((t=>t.setName(t.projectName))),e.getProjects().forEach((e=>{e.setTasks(e.tasks.map((e=>Object.assign(t(),e))))})),e.getProjects().forEach((t=>{t.getTasks().forEach((t=>{t.setTitle(t.title),t.setDate(t.dueDate),t.setStatus(t.status)}))}))):(e.setProjects(e.getProjects().map((t=>Object.assign(u(),t)))),e.getProjects().forEach((e=>e.setTasks(e.getTasks().map((e=>Object.assign(t(),e))))))),e},saveTodoList:t=>{localStorage.setItem("todoList",JSON.stringify(t))},addTask:(t,e)=>{const o=p.getTodoList();o.getProject(t).addTask(e),p.saveTodoList(o)},addProject:t=>{const e=p.getTodoList();e.addProject(t),p.saveTodoList(e)},setTask:(t,e,o,s)=>{const n=p.getTodoList();n.getProject(t).getTask(e).setDate(s),n.getProject(t).getTask(e).setTitle(o),p.saveTodoList(n)},changeTaskStatus:(t,e,o)=>{const s=p.getTodoList();s.getProject(t).getTask(e).setStatus(o),p.saveTodoList(s)},deleteProject:t=>{const e=p.getTodoList();e.deleteProject(t),p.saveTodoList(e)},deleteTask:(t,e)=>{const o=p.getTodoList();o.getProject(t).deleteTask(e),p.saveTodoList(o)},updateTodayProject:()=>{const t=p.getTodoList();t.updateTodayProject(),p.saveTodoList(t)},updateThisWeekProject:()=>{const t=p.getTodoList();t.updateThisWeekProject(),p.saveTodoList(t)}},k=p,T={loadHomePage:()=>{T.loadProjects(),T.initAddProjectButtons(),T.initProjectButtons(),T.openProject("Home",document.getElementById("home-btn"))},loadProjects:()=>{k.getTodoList().getProjects().forEach((t=>{"Home"!==t.getName()&&"Today"!==t.getName()&&"This week"!==t.getName()&&T.createNewProject(t.getName())}))},loadProjectContent:t=>{document.querySelector("#content").innerHTML=`\n        <div id="content-title">${t}</div>\n        <div id="content-body">\n          <div class="tasks-list"></div>\n        </div>`;const e=document.querySelector("#content-body");"Today"!==t&&"This week"!==t&&(e.innerHTML+='\n                <button class="add-task-btn">\n                  Add Task\n                </button>\n                <div class="task-popup" style="display: none">\n                  <input placeholder="Title" class="task-popup-title">\n                  <input type="date" class="task-popup-date">\n                  <div class="task-popup-btns">\n                    <button class="task-popup-add-btn">\n                      ADD\n                    </button>\n                    <button class="task-popup-cancel-btn">\n                      CANCEL\n                    </button>\n                  </div>\n                </div>'),T.loadTasks(t)},loadHomeTasks:t=>{T.openProject("Home",t.currentTarget)},loadTodayTasks:t=>{k.updateTodayProject(),T.openProject("Today",t.currentTarget)},loadThisWeekTasks:t=>{k.updateThisWeekProject(),T.openProject("This week",t.currentTarget)},createNewProject:t=>{const e=document.querySelector(".projects-list"),o=document.createElement("div"),s=document.createElement("button");o.classList.add("project"),s.classList.add("project-btn"),s.innerHTML+=`\n      <span>${t}</span>\n      <span class="project-delete-btn">x</span>`,o.appendChild(s),e.appendChild(o),T.openProject(t,s),T.initProjectButtons()},openProject:(t,e)=>{const o=document.querySelectorAll("button");T.loadProjectContent(t),o.forEach((t=>{t.classList.remove("active")})),e.classList.add("active")},addProject:()=>{const t=document.querySelector(".project-popup-input").value.trim(),e=u(t);""!==t?k.getTodoList().contains(t)?alert("Enter different project name"):(k.addProject(e),T.createNewProject(e.getName()),T.closeProjectPopup()):alert("Project name cant be empty")},deleteProject:(t,e)=>{const o=document.querySelector("#today-btn"),s=document.querySelector("#this-week-btn");e.classList.contains("active")&&T.clearProjectContent(),k.deleteProject(t),e.parentNode.remove(),o.classList.contains("active")&&(k.updateTodayProject(),T.clearTasks(),T.loadTasks("Today")),s.classList.contains("active")&&(T.clearTasks(),k.updateThisWeekProject(),T.loadTasks("This week"))},clearProjects:()=>{document.querySelector(".projects-list").textContent=""},clearProjectContent:()=>{document.querySelector("#content").textContent=""},openProjectPopup:()=>{const t=document.querySelector(".add-project-btn"),e=document.querySelector(".project-popup");t.style.display="none",e.style.display="flex"},closeProjectPopup:()=>{const t=document.querySelector(".add-project-btn"),e=document.querySelector(".project-popup"),o=document.querySelector(".project-popup-input");t.style.display="block",e.style.display="none",o.value=""},loadTasks:t=>{k.getTodoList().getProject(t).getTasks().forEach((t=>{T.createNewTask(t)})),"Today"!==t&&"This week"!==t&&T.initAddTaskButtons()},createNewTask:t=>{const e=document.querySelector("#content-title").textContent,o=document.querySelector(".tasks-list"),s=document.createElement("div"),n=k.getTodoList().getProject(e).getTask(t.getTitle()).getStatus();s.classList.add("task"),"ongoing"===n?(s.classList.remove("completed"),s.innerHTML+='<input type="checkbox" class="task-checkbox">'):(s.classList.add("completed"),s.innerHTML+='<input type="checkbox" class="task-checkbox" checked>'),s.innerHTML+=`\n        <p class="task-title">${t.getTitle()}</p>\n        <p class="task-due-date">${t.getDateFormatted()}</p>\n        <button class="edit-task-btn">Edit</button>\n        <button class="delete-task-btn">Delete</button>\n      `,s.appendChild(T.createEditTaskPopup(t)),o.appendChild(s),T.initTaskButtons()},addTask:()=>{const e=document.querySelector("#content-title").textContent,o=document.querySelector(".task-popup-title").value.trim(),s=document.querySelector(".task-popup-date").value,n=t(o,s,"ongoing");""!==o&&""!==s?k.getTodoList().getProject(e).contains(o)?alert("Enter new title"):(k.addTask(e,n),T.closeTaskPopup(),T.createNewTask(n)):alert("Fields must be complete")},editTask:t=>{const e=document.querySelector("#content-title").textContent,o=[...t.target.parentNode.parentNode.parentNode.children],s=o.find((t=>t.classList.contains("edit-task-popup"))),n=o.find((t=>t.classList.contains("task-title"))).textContent,a=[...s.children].find((t=>t.classList.contains("edit-task-task-title"))).value,c=[...s.children].find((t=>t.classList.contains("edit-task-task-due-date"))).value;if(""!==a&&""!==c){if("Today"===e||"This week"===e){const t=n.split("("),e=t[1].split(")")[0],o=t[0].trim();k.setTask(e,o,a,c),k.updateTodayProject(),k.updateThisWeekProject()}else k.setTask(e,n,a,c);T.closeEditTaskPopup(),T.clearTasks(),T.loadTasks(e)}else alert("Fields must be complete")},deleteTask:t=>{const e=document.querySelector("#content-title").textContent,o=t.target.parentNode.children[1].textContent;k.deleteTask(e,o),T.clearTasks(),T.loadTasks(e)},changeTaskStatus:t=>{let e=document.querySelector("#content-title").textContent;const o=t.target.parentNode;let s=o.children[1].textContent;if("Today"===e||"This week"===e){const t=s.split("(");e=t[1].split(")")[0],s=t[0].trim()}t.target.checked?(o.classList.add("completed"),k.changeTaskStatus(e,s,"completed")):(o.classList.remove("completed"),k.changeTaskStatus(e,s,"ongoing"))},clearTasks:()=>{document.querySelector(".tasks-list").textContent=""},createEditTaskPopup:t=>{const e=document.createElement("div");e.classList.add("edit-task-popup");const o=t.getTitle().split("(")[0].trim();return e.innerHTML+=`\n      <input type="text" value="${o}" class="edit-task-task-title">\n      <input type="date" value="${t.getDate()}" class="edit-task-task-due-date">\n      <div class="edit-task-popup-buttons">\n        <button class="edit-task-save-btn">Save</button>\n        <button class="edit-task-cancel-btn">Cancel</button>\n      </div>\n    `,e},openEditTaskPopup:t=>{const e=[...t.target.parentNode.children],o=e.find((t=>t.classList.contains("edit-task-popup"))),s=[...o.children].find((t=>t.classList.contains("edit-task-popup-buttons"))),n=[...s.children].find((t=>t.classList.contains("edit-task-save-btn"))),a=[...s.children].find((t=>t.classList.contains("edit-task-cancel-btn")));e.forEach((t=>{t!==o&&(t.style.display="none")})),o.style.display="flex",a.addEventListener("click",T.closeEditTaskPopup),n.addEventListener("click",T.editTask),T.hideTaskButtons()},closeEditTaskPopup:()=>{document.querySelectorAll(".task").forEach((t=>{[...t.children].forEach((t=>{t.classList.contains("edit-task-popup")?t.style.display="none":t.style.display=""}))})),T.showTaskButtons()},hideTaskButtons:()=>{const t=document.querySelector("#content-title").textContent,e=document.querySelectorAll(".edit-task-btn"),o=document.querySelectorAll(".delete-task-btn");"Today"!==t&&"This week"!==t&&(document.querySelector(".add-task-btn").style.display="none"),e.forEach((t=>{t.style.display="none"})),o.forEach((t=>{t.style.display="none"}))},showTaskButtons:()=>{const t=document.querySelector("#content-title").textContent,e=document.querySelectorAll(".edit-task-btn"),o=document.querySelectorAll(".delete-task-btn");"Today"!==t&&"This week"!==t&&(document.querySelector(".add-task-btn").style.display=""),e.forEach((t=>{t.style.display=""})),o.forEach((t=>{t.style.display=""}))},openTaskPopup:()=>{const t=document.querySelector(".add-task-btn"),e=document.querySelector(".task-popup");t.style.display="none",e.style.display="flex"},closeTaskPopup:()=>{const t=document.querySelector(".add-task-btn"),e=document.querySelector(".task-popup"),o=document.querySelectorAll(".task-popup>input");t.style.display="block",e.style.display="none",o.forEach((t=>t.value=null))},initAddTaskButtons:()=>{const t=document.querySelector(".add-task-btn"),e=document.querySelector(".task-popup-add-btn"),o=document.querySelector(".task-popup-cancel-btn");t.addEventListener("click",T.openTaskPopup),e.addEventListener("click",T.addTask),o.addEventListener("click",T.closeTaskPopup)},initAddProjectButtons:()=>{const t=document.querySelector(".add-project-btn"),e=document.querySelector(".project-popup-add-btn"),o=document.querySelector(".project-popup-cancel-btn");t.addEventListener("click",T.openProjectPopup),e.addEventListener("click",T.addProject),o.addEventListener("click",T.closeProjectPopup)},initProjectButtons:()=>{const t=document.querySelector("#home-btn"),e=document.querySelector("#today-btn"),o=document.querySelector("#this-week-btn"),s=document.querySelectorAll(".project-btn");t.addEventListener("click",T.loadHomeTasks),e.addEventListener("click",T.loadTodayTasks),o.addEventListener("click",T.loadThisWeekTasks),s.forEach((t=>{t.addEventListener("click",T.handleProjectButtons)}))},initTaskButtons:()=>{const t=document.querySelectorAll(".task-checkbox"),e=document.querySelectorAll(".edit-task-btn"),o=document.querySelectorAll(".delete-task-btn");t.forEach((t=>{t.addEventListener("change",T.changeTaskStatus)})),e.forEach((t=>{t.addEventListener("click",T.openEditTaskPopup)})),o.forEach((t=>{t.addEventListener("click",T.deleteTask)}))},handleProjectButtons:t=>{const e=t.currentTarget,o=e.children[0].textContent;t.target.classList.contains("project-delete-btn")?T.deleteProject(o,e):T.openProject(o,e)}},y=T;document.addEventListener("DOMContentLoaded",y.loadHomePage)})();