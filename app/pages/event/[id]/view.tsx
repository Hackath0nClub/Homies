// components
import { Title } from '../../../feature/event/components/view/Title'
import { Image } from '../../../feature/event/components/view/Image'
import { Bar } from '../../../feature/event/components/view/Bar'
import { Description } from '../../../feature/event/components/view/Description'
import { DjTimeTable } from '../../../feature/event/components/view/DjTimeTable'
import { VjTimeTable } from '../../../feature/event/components/view/VjTimeTable'
import { DjButton } from '../../../feature/event/components/view/DjButton'
import { Guest } from '../../../feature/event/components/view/Guest'
import { EventItems } from '../../../feature/event/components/view/EventItems'
import { Organizers } from '../../../feature/event/components/view/Organizers'

// hooks
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useEvent } from '../../../feature/event/hooks/useEvent'
import { useTimetable } from '../../../feature/event/hooks/useTimetable'

const EventDetails = () => {
  const { query, isReady } = useRouter()
  const { loadEvent } = useEvent()
  const { loadTimetable } = useTimetable()

  useEffect(() => {
    if (isReady) {
      loadEvent(Number(query.id))
      loadTimetable(Number(query.id))
    }
  }, [isReady])

  return (
    <div className="flex justify-center min-h-screen bg-[rgba(28,32,37,1)]">
      <div className="w-5/6 grid md:grid-cols-10 sm:grid-cols-1 gap-8 m-8">
        <div className="md:col-span-6">
          <Title />
          <Image />
          <Bar />
          <Description />
          <Bar />
          <DjTimeTable />
          <VjTimeTable />
          <DjButton />
          <Bar />
          <Guest />
        </div>
        <div className="md:col-span-4">
          <EventItems />
          <Organizers />
        </div>
      </div>
    </div>
  )
}

export default EventDetails
