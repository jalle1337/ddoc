import { useContext, useEffect, useRef, useState } from "react";
import { tempData } from "./TempData";
import DeleteDialog from "src/common/components/popUp/deleteDialog";
import ProjectTable from "./projectTable";
import { Projects } from "./profile";

export default function ProjectsDisplay() {
    const [showDeleteDialog, setDeleteDialog] = useState(false);
    const { projects, setProjects } = useContext(Projects);
    const ref = useRef(null);

    let headers = [];
    headers.push("Project");
    headers.push("Author");
    headers.push("Created");
    headers.push("Tickets");

    function onDeleteRow(id, name) {
        const project = { id: id, projectName: name };
        ref.current = project;
        setDeleteDialog(true);
    }

    function deleteProject() {
        // If api returns true on response
        const newArray = projects.filter(
            (project) => project.id !== ref.current.id
        );
        setProjects(newArray);
        setDeleteDialog(false);
    }

    return (
        <>
            {showDeleteDialog && (
                <DeleteDialog
                    open={showDeleteDialog}
                    title={`Leave project -> ${ref.current.projectName}`}
                    onClose={() => setDeleteDialog(false)}
                    action={deleteProject}
                    actionText="Leave"
                >
                    If you are the only remaining member in the project the
                    project will get deleted. <br /> <br /> In case you are an
                    admin and want to transmit the role to a specific person,
                    please enter the project and assign a member to the admin
                    role otherwise a random person will be assigned admin.
                </DeleteDialog>
            )}
            <ProjectTable headers={headers} onDeleteRow={onDeleteRow} />
        </>
    );
}
