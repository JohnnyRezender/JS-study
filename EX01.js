
/*
Nesse desafio deverá ser feito uma fila de processamento somente com javascript e sem bibliotecas externas

---

A fila deverá ter os seguintes métodos:
- addJob
- removeJob
- removeAllJobs
- getJobs

Como ela deverá se comportar:
- A classe da fila deverá receber a função `myWorker` como parametro no construtor e todo job processado deverá ser executado pelo myWorker
- Ao adicionar um item na fila com addJob deverá começar a processar a fila
- `addJob`
  -  recebe um job como parametro e começa a processar a fila
- `removeJob`
  - remove um job usando pelo id
- `getJobs`
  - retorna todos os jobs que ainda estão na fila
- `removeAllJobs`
  - remove todos os jobs da fila
*/

function myWorker(_job) {
    return new Promise(resolve => {

        console.log(`Processando arquivo "${_job.payload.filename}"`);
        console.log(_job.payload.body);

        setTimeout(() => {
            console.log(new Date(), _job);
        resolve();
        }, 1000)
    })
}

class Queue
{
    jobs     = [];
    myWorker;

    constructor(myWorker)
    {
        this.myWorker = myWorker;
    }


    addJob(job)
    {
        this.jobs.push(job);
        console.log("Job successfully added!")
        // this.processQueue()
    }

    processQueue()
    {
        if (! this.jobs.length) {
            console.log("Queue is empty!");
            return;
        }

        for (let propriedade in this.jobs) {
            this.myWorker(this.jobs[propriedade]);
            /**
             * @note aqui foi implementado o delete porque o .splice modificava a posição dos elementos no array
             * O que fazia com que o processamento pulasse alguns jobs a serem executados. Após processar todos os jobs,
             * é limpado o array de jobs
             */
            delete this.jobs[propriedade];
        }
        this.removeAllJobs();
    }

    removeJob(id)
    {
        if (typeof(this.jobs[id]) === "undefined") {
            console.log("Job dont exist!");
            return;
        }
        this.jobs.splice(id, 1);
        console.log("Job successfully removed!");
    }

    getJobs()
    {
        if (! this.jobs.length) {
            console.log("Queue is empty!");
            return;
        }

        console.log(this.jobs);
    }

    removeAllJobs()
    {
        this.jobs = [];
        console.log("Queue cleaned!")
    }
}
let queue = new Queue(myWorker);
queue.addJob({
    id: 1,
    payload: {
       filename: 'file1.txt',
       body: 'exemplo de conteudo 1'
    }
})
queue.addJob({
    id: 2,
    payload: {
       filename: 'file2.txt',
       body: 'exemplo de conteudo 2'
    }
})
queue.addJob({
    id: 3,
    payload: {
       filename: 'file3.txt',
       body: 'exemplo de conteudo 3'
    }
})

queue.getJobs();
// queue.removeAllJobs();
// queue.removeJob(1);

// queue.removeJob(0);
queue.processQueue();
queue.getJobs();
queue.getJobs();
queue.getJobs();
queue.getJobs();

