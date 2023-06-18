import { useContext } from "react";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { ProjectsContext } from "../../../store/ProjectsProvider";

const QuestionForm = () => {
    const { questionForm: { open, question, action }, handleQuestionForm } = useContext(ProjectsContext);
    const handleClickClose = () => {
        handleQuestionForm(false);
    }
    const handleClickAccept = () => {
        action && action();
        handleQuestionForm(false);
    }
    return (
        <Dialog open={open} handler={handleClickClose}>
            <div className="flex items-center justify-between">
                <DialogHeader>Are you sure?</DialogHeader>
                <XMarkIcon className="mr-3 h-5 w-5" onClick={handleClickClose} />
            </div>
            <DialogBody divider>
                {question || 'Please confirm action'}
            </DialogBody>
            <DialogFooter className="space-x-2">
                <Button variant="outlined" color="red" onClick={handleClickClose}>
                    No
                </Button>
                <Button variant="gradient" color="green" onClick={handleClickAccept}>
                    Yes
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default QuestionForm;