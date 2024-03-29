import {Request, Response} from "express";
import * as commitController from "../controllers/commit";

const getCommits = async (req: Request, res: Response) => {
  try {
    let validatedParams: any = {};
    if (req.query) {
      // Set branch for query
      if (req.query.branch) validatedParams.branch = req.query.branch;
    }

    const commits: any = await commitController.getCommits(validatedParams);
    if (commits.length == 0) {
      res.status(200).json({success: true, message: "No commits found."});
    } else {
      let response: any = [];
      commits.forEach((commit: any) => {
        const newCommit = {
          sha: commit.sha,
          nodeId: commit.node_id,
          message: commit.commit.message,
          authorId: commit.author.login,
          date: commit.commit.committer.date
        };
        response.push(newCommit);
      });
      res
        .status(200)
        .json({success: true, response, message: "Commits fetched."});
    }
  } catch (error) {
    console.log("handler.commit.getCommits.error", error);
    res.status(401).json({
      success: false,
      message: "Something unexpected wrong has happened."
    });
  }
};

export {getCommits};
