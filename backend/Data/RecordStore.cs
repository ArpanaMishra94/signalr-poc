//Single source of truth

namespace backend.Data;

public static class RecordStore
{
    public static List<object> Records = new()
    {
        new
        {
            id = 101,
            customerName = "ABC Growers",
            status = "Pending Review"
        },
        new
        {
            id = 102,
            customerName = "Green Valley Farms",
            status = "Pending Review"
        },
        new
        {
            id = 103,
            customerName = "Sunrise Agriculture",
            status = "Approved"
        }
    };
}