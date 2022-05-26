let reqFormat = 'REQ-'
exports = {
  onTicketCreateHandler: function (args) {
    console.info("Ticket create event hitted");
    const subject = args.data.ticket.subject;
    console.info("Subject-> ", subject)
    if (subject.startsWith(reqFormat)) {
      const originalTicket = subject.slice(subject.index('-') + 1, subject.lastIndexOf('-'));
      console.info("splited Orginal ticket: " + originalTicket);
      const newTicket = args.data.ticket.id;
      mergeTicket(newTicket, originalTicket);
    }
  }
};

const mergeTicket = function (newTicket, originalTicket) {
  const body = {
    primary_id: originalTicket, ticket_ids: [newTicket]
  };
  console.log("post call body:")
  console.log(body)
  const payload = {
    headers: { Authorization: "Basic <%= iparams.apiKey %>", "Content-Type": "application/json" },
    body: JSON.stringify(body)
  };
  $request.post(`https://<%= iparams.domain %>/api/v2/tickets/merge`, payload).then(function (result) {
    console.info('ticket merged successfully')
  }, function (error) {
    console.error(error);
  });
}
