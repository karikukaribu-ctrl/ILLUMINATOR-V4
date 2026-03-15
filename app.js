const dashboard = document.getElementById("dashboard")
const projectList = document.getElementById("projectList")
const modalRoot = document.getElementById("modalRoot")
const timeline = document.getElementById("timeline")

let mode="projects"
let focusProject=null

let data={

projects:[

{
id:1,
name:"Article addiction écrans",
progress:30,
tasks:[
{title:"recherche littérature",duration:30,energy:2,done:false},
{title:"plan détaillé",duration:20,energy:1,done:false}
]
},

{
id:2,
name:"Carnet de stage",
progress:45,
tasks:[
{title:"structure chapitres",duration:40,energy:2,done:false}
]
}

],

blocks:[

{time:9,label:"Rédaction article"},
{time:11,label:"Plan carnet stage"}

]

}



function renderTimeline(){

timeline.innerHTML=""

for(let h=6;h<=22;h++){

const slot=document.createElement("div")
slot.className="time-slot"
slot.innerHTML=`${h}:00`

let block=data.blocks.find(b=>b.time===h)

if(block){

const el=document.createElement("div")
el.className="block"
el.textContent=block.label

slot.appendChild(el)

}

timeline.appendChild(slot)

}

}



function renderProjects(){

dashboard.innerHTML=""

let list=data.projects

if(focusProject){
list=list.filter(p=>p.id===focusProject)
}

list.forEach(project=>{

const card=document.createElement("div")
card.className="project-card"

card.innerHTML=`

<h3>${project.name}</h3>

<div class="progress-vertical">

<div class="progress-fill" style="height:${project.progress}%"></div>

</div>

<p>${project.progress}%</p>

`

card.onclick=()=>openProject(project)

dashboard.appendChild(card)

})

}



function renderProjectList(){

projectList.innerHTML=""

data.projects.forEach(p=>{

const item=document.createElement("div")
item.textContent=p.name

item.onclick=()=>{

focusProject=p.id
renderProjects()

}

projectList.appendChild(item)

})

}



function openProject(project){

modalRoot.innerHTML=""

const overlay=document.createElement("div")
overlay.className="modal-overlay"
overlay.onclick=closeModal

const modal=document.createElement("div")
modal.className="modal"

modal.innerHTML=`

<div class="close">X</div>

<h2>${project.name}</h2>

<p>progression ${project.progress}%</p>

<h3>Tâches</h3>

<ul>
${project.tasks.map(t=>`<li>${t.title}</li>`).join("")}
</ul>

<button onclick="addTask(${project.id})">+ tâche</button>

`

modal.querySelector(".close").onclick=closeModal

modalRoot.appendChild(overlay)
modalRoot.appendChild(modal)

}



function closeModal(){
modalRoot.innerHTML=""
}



function addTask(projectId){

const title=prompt("Nom tâche")

if(!title)return

let project=data.projects.find(p=>p.id===projectId)

project.tasks.push({

title:title,
duration:20,
energy:1,
done:false

})

renderProjects()

}



function recommendation(){

let tasks=data.projects.flatMap(p=>p.tasks.filter(t=>!t.done))

if(tasks.length===0)return

tasks.sort((a,b)=>a.duration-b.duration)

let suggestion=tasks[0]

document.getElementById("recommendation").innerHTML=`

Prochaine action

<br>

${suggestion.title}

<br>

${suggestion.duration} min

`

}



document.querySelectorAll(".nav button").forEach(btn=>{
btn.onclick=()=>{
mode=btn.dataset.mode
renderProjects()
}
})



document.getElementById("toggleDark").onclick=()=>{
document.body.classList.toggle("dark")
}



document.getElementById("focusMode").onclick=()=>{
focusProject=focusProject?null:data.projects[0].id
renderProjects()
}



document.getElementById("fontSelect").onchange=(e)=>{
document.body.classList.remove("font-yusei","font-inter")
document.body.classList.add(e.target.value)
}



document.getElementById("fontSize").onchange=(e)=>{
document.body.style.fontSize=e.target.value+"px"
}



document.getElementById("season").onchange=(e)=>{
document.body.className="theme--"+e.target.value
}



renderTimeline()
renderProjects()
renderProjectList()
recommendation()
