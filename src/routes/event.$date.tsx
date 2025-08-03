import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { createVacation, getEventByDate } from "~/actions";
import { Modal } from "~/components/modal";
import { prettyFormatDate } from "~/utils/dateUtils";

const RouteComponent = () => {
  const router = useRouter();

  const { date } = Route.useParams();
  const event = Route.useLoaderData();

  const [error, setError] = useState(null);

  console.log(error);

  const onSubmit = async (event) => {
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

  return (
    <Modal
      open={true}
      onClose={() => router.navigate({ to: "/" })}
      footer={
        <button
          type="submit"
          className="border-2 text-orange-400 border-orange-400  px-4 py-3 rounded-xl uppercase"
        >
          {event ? "Update event" : "Add event"}
        </button>
      }
    >
      <form onSubmit={onSubmit}>
        <h1 className="font-semibold text-xl">
          Event for {prettyFormatDate(date)}
        </h1>
        <input type="hidden" name="date" value={date} />
        <input
          key={date}
          name="title"
          placeholder="Enter event title"
          defaultValue={event?.name}
          className="w-full px-4 py-3 rounded-xl text-white placeholder:text-neutral-400
             focus:outline-none focus:ring-2 focus:ring-amber-600 mt-4 -mb-2 border border-neutral-600"
        />
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </Modal>
  );
};

export const Route = createFileRoute("/event/$date")({
  component: RouteComponent,
  loader: ({ params }) => getEventByDate({ data: params.date }),
});
