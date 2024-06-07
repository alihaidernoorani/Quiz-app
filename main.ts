import inquirer from "inquirer";

console.log(`
Rules of the Game:
1. Each correct answer awards you 1 point.
2. Each incorrect answer deducts 1/3 of a point.
3. You must answer each question within the given time limit of 30 seconds, or you will score zero points for that question and the quiz 
   will move to the next question.
`);

const quiz = [
    {
        name: "Question1",
        message: "What is TypeScript primarily used for?",
        type: "list",
        choices: ["A. Memory Management", "B. Dynamic Typing", "C. Static Typing", "D. Asynchronous operations"],
    },
    {
        name: "Question2",
        message: "Which of the following is NOT a valid TypeScript data type?",
        type: "list",
        choices: ["A. void", "B. any", "C. dynamic", "D. tuple"],
    },
    {
        name: "Question3",
        message: "How do you denote a variable as readonly in TypeScript?",
        type: "list",
        choices: ["A. const","B. static", "C. readonly", "D. fixed"],
    },
    {
        name: "Question4",
        message: "How do you specify that a function does not return anything in TypeScript?",
        type: "list",
        choices: ["A. function myFunc(): undefined", "B. function myFunc(): void", "C. function myFunc(): null", "D. function myFunc(): None"],
    },
    {
        name: "Question5",
        message: "How do you define a custom type in TypeScript?",
        type: "list",
        choices: ["A. interface", "B. typedef", "C. type", "D. Both A and C"],
    },
    {
        name: "Question6",
        message: "What is the primary purpose of TypeScript interfaces?",
        type: "list",
        choices: ["A. To create new classes", "B. To describe the shape of an object", "C. To generate HTML templates", "D. To manage asynchronous code"],
    },    
    {
        name: "Question7",
        message: "What is a union type in TypeScript?",
        type: "list",
        choices: ["A. A type that can be any value", "B. A type that can be one of several types", "C. A type that can be both a string and a number simultaneously", "D. A type that can be an object"],
    },
    {
        name: "Question8",
        message: "Which TypeScript feature allows for checking the type of a variable at runtime?",
        type: "list",
        choices: ["A. Type guard", "B. Runtime type", "C. Dynamic type", "D. Typeof"],
    },
    {
        name: "Question9",
        message: "What TypeScript compiler option ensures strict type checking?",
        type: "list",
        choices: ["A. --strict", "B. --strictTypes", "C. --typeCheck", "D. --enforceTypes"],
    },
    {
        name: "Question10",
        message: "How do you define an optional parameter in the TypeScript function?",
        type: "list",
        choices: ["A. function foo(param: string?)", "B. function foo(param?: string)", "C. function foo(param string=)", "D. function foo(param string?)"],
    },
    {
        name: "Question11",
        message: "Which of the following will transpile a TypeScript file (example.ts) to JavaScript?",
        type: "list",
        choices: ["A. typescript example.ts", "B. ts-compile example.ts", "C. tsc example.ts", "D. ts example.ts"],
    },
    {
        name: "Question12",
        message: "How do you declare a variable that can be either a string or null in TypeScript?",
        type: "list",
        choices: ["A. let variable: string || null;", "B. let variable: string | null;", "C. let variable: string & null;", "D. let variable: string && null;"],
    },
    {
        name: "Question13",
        message: "What is the purpose of the never type in TypeScript?",
        type: "list",
        choices: ["A. To indicate that a variable can be any type.", "B. To represent the absence of values.", "C. To indicate a function always throws an exception or never returns.", "D. To represent the absence of a type."],
    },
    {
        name: "Question14",
        message: "How can you allow an object to have any number of properties of a given type in TypeScript?",
        type: "list",
        choices: ["A. { [key: any]: string; }", "B. { [key: string]: any; }", "C. { [property: string]: string; }", "D. { [value: string]: string; }"],
    },
    {
        name: "Question15",
        message: ` Which command would you use to install TypeScript globally using npm?`,
        type: "list",
        choices: ["A. npm install typescript", "B. npm global install typescript", "C. npm install -g typescript", "D. npm typescript install global"],
    },
    {
        name: "Question16",
        message: "How do you define private property in a TypeScript class?",
        type: "list",
        choices: ["A. def property: string;", "B. private property: string;", "C. #property: string;", "D. property: private string;"],
    },
    {
        name: "Question17",
        message: "Which of the following TypeScript types can the unknown type be assigned to without type assertion?",
        type: "list",
        choices: ["A. string", "B. number", "C. any", "D. void"],
    },
    {
        name: "Question18",
        message: "In TypeScript, what does an enum allow you to do?",
        type: "list",
        choices: ["A. Store a list of numeric values.", "B. Store a set of named constants, numeric or string.", "C. Define a new data type.", "D. Assign multiple types to a variable."],
    },
    {
        name: "Question19",
        message: "Which TypeScript feature allows for declaring new names for existing types?",
        type: "list",
        choices: ["A. Aliases", "B. Enums", "C. Interfaces", "D. Decorators"],
    },
    {
        name: "Question20",
        message: "How do you specify a function type in TypeScript that takes in a number and returns a string?",
        type: "list",
        choices: ["A. function(num: number) -> string", "B. function: (number) => string", "C. (num: number) => string", "D. Function(number): string"],
    },
]

async function askQuestion(questionNumber: number, count: number): Promise<number> {
    quiz[questionNumber].message = `Q${count}: ${quiz[questionNumber].message}`;

    const timerPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("Timeout")), 30000); // Timeout after 30 seconds
    });

    try {
        const answers = await Promise.race([
            inquirer.prompt([quiz[questionNumber]]), // Prompt user with question
            timerPromise // Timer promise
        ]);

        const userAnswer = answers[quiz[questionNumber].name];
        const choices = quiz[questionNumber].choices;
        return choices.indexOf(userAnswer);
    } catch (error: any) {
        if (error.message === "Timeout") {
            console.log("Time's up! No answer provided. (0 marks)");
            return -1; // Indicate timeout
        } else {
            console.error("An unexpected error occurred:", error);
            return -1; // Indicate error
        }
    }
}

async function compareAnswer(selectedAnswer: number, answers: number[], questionNumber: number, currentMark: number): Promise<number> {
    if (selectedAnswer === answers[questionNumber]) {
        console.log("Correct answer (+1 mark)");
        currentMark += 1;
    } else {
        console.log("Wrong answer (-1/3 mark)");
        currentMark -= 1 / 3;
    }
    return currentMark;
}

const answers: number[] = [2, 2, 2, 1, 3, 1, 1, 0, 0, 1, 2, 1, 2, 1, 2, 1, 2, 1, 0, 2]; // answers index array

async function runQuiz(answers: number[]) {
    let marks = 0;
    let questionNumbers = new Set<number>();
    for (let i = 0; i < answers.length; i++) {
        let randomNumber = Math.floor(Math.random() * quiz.length);
        while (questionNumbers.has(randomNumber)) {
            randomNumber = Math.floor(Math.random() * quiz.length);
        }
        questionNumbers.add(randomNumber);
        
        const selectedAnswer = await askQuestion(randomNumber, i + 1);
        if (selectedAnswer === -1) {
            // console.log(`Time's up! No answer provided for question ${i + 1}. (0 marks)`);
        } else {
            marks = await compareAnswer(selectedAnswer, answers, randomNumber, marks);
        }
    }
    console.log(`Total Score: ${Math.floor(marks)}`);
}

runQuiz(answers);












