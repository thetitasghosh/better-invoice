"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DeleteData } from "@/app/actions";


function SubmitDeleteButton({ table, id }) {
  const deleteAction = DeleteData.bind(null, table, id);
  return (
    <AlertDialogAction
      type="submit"
      formAction={deleteAction}
      //   disabled={pending}
      className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
    >
      Delete
    </AlertDialogAction>
  );
}

export default function DeleteAlertDialog({ children, table, id }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <form>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              invoice and remove it from our database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
            <SubmitDeleteButton table={table} id={id} />
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
