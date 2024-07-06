import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

import { PedidoViatura } from '../../@types/types'
import { converterDataISOparaSchedule } from '../../utils/scripts';
export default function ScheduleViatura({pedidosViatura}: {pedidosViatura: PedidoViatura[]}) {
    const formatPedidos = pedidosViatura?.map((item) => {
        return {
          title: `${item.motorista} / ${item.companhia}`,
          start: converterDataISOparaSchedule(item.dataDesejada),
          end: converterDataISOparaSchedule(item.dataDevolucao),
          backgroundColor: `rgba(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},1)`,
        };
      })
    return (
        <FullCalendar
        locale={"pt-br"}
            plugins={[dayGridPlugin,timeGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek'
              }}
              nowIndicator={true}
              editable={true}
              selectable={true}
              selectMirror={true}
              events={formatPedidos}
        />
    )
}