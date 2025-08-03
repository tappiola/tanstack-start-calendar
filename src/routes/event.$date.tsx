import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { createVacation, deleteVacation, getEventByDate } from "~/actions";
import { Modal } from "~/components/modal";
import { prettyFormatDate } from "~/utils/dateUtils";
import clsx from "clsx";

const RouteComponent = () => {
  const router = useRouter();

  const { date } = Route.useParams();
  const event = Route.useLoaderData();

  const [error, setError] = useState(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      await createVacation({ data: formData });
      await router.invalidate();
      await router.navigate({ to: "/" });
    } catch (e) {
      setError(e.message);
    }
  };

  const onDelete = async () => {
    await deleteVacation({ data: date });
    await router.invalidate();
    await router.navigate({ to: "/" });
  };

  return (
    <Modal
      open={true}
      onClose={() => router.navigate({ to: "/" })}
      footer={
        <div className="flex gap-7 text-neutral-400 hover:text-neutral-50">
          {event && (
            <button className="hover:cursor-pointer" onClick={onDelete}>
              Delete
            </button>
          )}
          <button
            type="submit"
            form="event-form"
            className="hover:cursor-pointer border-2 text-orange-400 border-orange-400  px-4 py-3 rounded-xl uppercase"
          >
            {event ? "Update event" : "Add event"}
          </button>
        </div>
      }
    >
      <form onSubmit={onSubmit} id="event-form">
        <h1 className="font-semibold text-xl">
          Event for {prettyFormatDate(date)}
        </h1>
        <input type="hidden" name="date" value={date} />
        <input
          key={date}
          name="title"
          placeholder="Enter event title"
          defaultValue={event?.name}
          className={clsx(
            "w-full px-4 py-3 rounded-xl text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-600 mt-4 -mb-2 border border-neutral-600 ",
            { "border-red-800 ring-red-800": error },
          )}
          aria-describedby={error ? "event-error" : undefined}
          aria-invalid={!!error}
        />
        {error && (
          <div id="event-error" className="text-red-800 text-sm pl-1 pt-3">
            {error}
          </div>
        )}
      </form>
    </Modal>
  );
};

export const Route = createFileRoute("/event/$date")({
  component: RouteComponent,
  loader: ({ params }) => getEventByDate({ data: params.date }),
});
