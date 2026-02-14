import getEmbeddings from "../Config/embedding.js";
import cosineSimilarity from "compute-cosine-similarity";

async function ComputeCosineSimilarity(ResumeText , JdText){

    const ResumeVec = await getEmbeddings(ResumeText);
    const JdVec = await getEmbeddings(JdText);

    // console.log(ResumeVec)
    // console.log(JdVec)

    const score = cosineSimilarity(ResumeVec , JdVec);

    return score;

}

export default ComputeCosineSimilarity