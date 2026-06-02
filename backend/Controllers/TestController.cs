using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using backend.Hubs;

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

    [HttpPost("update")]
    public async Task<IActionResult> Update()
    {
        await _hubContext.Clients.All.SendAsync(
            "RecordUpdated",
            new
            {
                id = 101,
                customerName = "ABC Growers",
                status = "Approved"
            });

        return Ok();
    }
}