//Triggers SignalR events

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using backend.Hubs;
using backend.Data;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    private readonly IHubContext<NotificationHub> _hubContext;

    public TestController(
        IHubContext<NotificationHub> hubContext)
    {
        _hubContext = hubContext;
    }

    //Provide latest records to frontend
    [HttpGet("records")]
    public IActionResult GetRecords()
    {
        return Ok(RecordStore.Records);
    }

    [HttpPost("update")]
    public async Task<IActionResult> Update()
    {
        var updatedRecord = new
    {
        id = 101,
        customerName = "ABC Growers",
        status = "Approved"
    };

    //updates backend state first.
    RecordStore.Records[0] = updatedRecord;

    //broadcasts the update.
    await _hubContext.Clients.All.SendAsync(
        "ADDRESS_VERIFICATION_STARTED",
        updatedRecord
    );

    return Ok();
    }
}