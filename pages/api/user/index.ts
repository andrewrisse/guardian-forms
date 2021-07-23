import {NextApiRequest, NextApiResponse} from "next";
import withAuth from "../../../middleware/withAuth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    //@ts-ignore
    const user = req.user;
    if (user) {
        // in a real world application you might read the user id from the session and then do a database request
        // to get more information on the user if needed
        res.json({
            isLoggedIn: true,
            ...user,
        });
    } else {
        res.json({
            isLoggedIn: false,
        });
    }
};

export default withAuth(handler);
