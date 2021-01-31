namespace Domain.Base
{
    public interface IRepository<TEntity> : IReadOnlyRepository<TEntity> where TEntity : class
    {
        TEntity Add(TEntity entity);

        void Delete(object id);
    }
}
