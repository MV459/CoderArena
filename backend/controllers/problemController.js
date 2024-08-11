// import Problem from '../models/Problem';

// export async function createProblem(req, res) {
//     try {
//         const { title, description, difficulty, inputFormat, outputFormat, sampleTestCases, inputFile, outputFile, topicTags } = req.body;
//         const problem = new Problem({
//             userid: req.user.user_id,
//             title,
//             description,
//             difficulty,
//             inputFormat,
//             outputFormat,
//             sampleTestCases,
//             inputFile,
//             outputFile,
//             topicTags
//         });

//         await problem.save();
//         res.status(201).json(problem);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Error creating problem");
//     }
// }

// export async function getProblems(req, res) {
//     try {
//         const problems = await Problem.find();  // Use Problem.find() here
//         res.status(200).json(problems);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Error fetching problems");
//     }
// }


import Problem from '../models/Problem';

export async function createProblem(req, res) {
    try {
        const { title, description, difficulty, inputFormat, outputFormat, sampleTestCases, inputFile, outputFile, topicTags } = req.body;
        const problem = new Problem({
            title,
            description,
            difficulty,
            inputFormat,
            outputFormat,
            sampleTestCases,
            inputFile,
            outputFile,
            topicTags
        });

        await problem.save();
        res.status(201).json(problem);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating problem");
    }
}

export async function getProblems(req, res) {
    try {
        const problems = await Problem.find();
        res.status(200).json(problems);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching problems");
    }
}
