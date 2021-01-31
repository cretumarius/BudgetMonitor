using System;
namespace Domain.Base.EntityBase
{
    public class EntityBase<TId> : IEntityBase
    {
        public TId Id { get; protected set; }

        public static bool operator ==(EntityBase<TId> entity1, EntityBase<TId> entity2)
        {
            if (entity1 is null && entity2 is null)
            {
                return true;
            }

            if (entity1 is null || entity2 is null)
            {
                return false;
            }

            if (entity1.Id.ToString() == entity2.Id.ToString())
            {
                return true;
            }

            return false;
        }

        public static bool operator !=(EntityBase<TId> entity1, EntityBase<TId> entity2)
        {
            return !(entity1 == entity2);
        }

        public override bool Equals(object entity)
        {
            return entity != null && entity is EntityBase<TId> && this == (EntityBase<TId>)entity;
        }

        public override int GetHashCode()
        {
            return this.Id.GetHashCode();
        }
    }
}
