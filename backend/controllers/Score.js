import getEmbeddings from "../Config/embedding.js";
import cosineSimilarity from "compute-cosine-similarity";

async function ComputeCosineSimilarity(req,res, next){


    const ResumeText = req.resumetext
    const JdText = req.body.jdText;

    const ResumeVec = await getEmbeddings(ResumeText);
    const JdVec = await getEmbeddings(JdText);

    const score = cosineSimilarity(ResumeVec , JdVec);

    req.score = score

    next();

}

export default ComputeCosineSimilarity