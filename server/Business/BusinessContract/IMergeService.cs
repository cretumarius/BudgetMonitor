using System.IO;
using System.Threading.Tasks;

namespace Business.BusinessContract
{
    public interface IMergeService
    {
        Task<MemoryStream> Merge(string folder);
    }
}
