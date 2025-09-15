import { getAllEvents, deleteEvent, Event } from "@/lib/eventsDb";
import { redirect } from "next/navigation";
import BackButton from "@/components/BackButton";

async function remove(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!id) return;
  deleteEvent(id);
  redirect("/events");
}

export default function RemoveEventPage() {
  const events = getAllEvents() as Event[];
  return (
    <div className="space-y-6 animate-fade-in">
      <BackButton href="/extras/portals/events/menu" />

      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-[var(--red)] mb-2">Remove Event</h1>
        <p className="text-[var(--navy)]/80">Permanently delete an event from the system</p>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-[var(--navy)] mb-2">No Events Available</h3>
          <p className="text-[var(--navy)]/70 mb-6">There are currently no events to remove.</p>
          <a href="/extras/portals/events/add" className="btn-cozy btn-primary">
            Create New Event
          </a>
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <div className="bg-[color:var(--red)]/5 border border-[color:var(--red)]/20 rounded-lg p-6">
            <div className="mb-4">
              <h3 className="font-semibold text-[var(--red)]">Warning</h3>
              <p className="text-sm text-[var(--navy)]/80">This action cannot be undone</p>
            </div>

            <form action={remove} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[var(--navy)] mb-2">
                  Select Event to Delete
                </label>
                <select
                  name="id"
                  required
                  className="w-full border-2 border-[color:var(--navy)]/20 rounded-lg px-4 py-3 focus:border-[var(--red)] focus:outline-none transition-colors"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose an event to delete...
                  </option>
                  {events.map((e: Event) => (
                    <option key={e.id} value={e.id}>
                      {e.title} ({e.date})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <a href="/extras/portals/events/menu" className="btn-cozy btn-outline flex-1">
                  Cancel
                </a>
                <button className="btn-cozy bg-[var(--red)] text-white flex-1" type="submit">
                  Delete Forever
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
