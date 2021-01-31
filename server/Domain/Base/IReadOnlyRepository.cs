using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Domain.Base
{
    public interface IReadOnlyRepository<TEntity> where TEntity : class
    {
        TEntity GetById(object key);

        IEnumerable<TEntity> GetAll();

        IEnumerable<TEntity> GetCollectionByFilterWihtChildren(Expression<Func<TEntity, bool>> filter, params Expression<Func<TEntity, object>>[] includeProperties);

        TEntity GetByFilterWithChildren(Expression<Func<TEntity, bool>> filter, params Expression<Func<TEntity, object>>[] includeProperties);
    }
}
