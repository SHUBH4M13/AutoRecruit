import getEmbeddings from "../Config/embedding.js";
import cosineSimilarity from "compute-cosine-similarity";

async function ComputeCosineSimilarity(req,res, next){


    const ResumeText = req.resumetext
    const JdText = req.body.jdText;

    const ResumeVec = await getEmbeddings(ResumeText);
    const JdVec = await getEmbeddings(JdText);

    let score = cosineSimilarity(ResumeVec , JdVec);

    score = score * 100
    req.score = score
    console.log(score)

    next();

}

export default ComputeCosineSimilarity