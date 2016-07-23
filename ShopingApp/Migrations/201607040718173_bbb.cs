namespace ShopingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class bbb : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Activities",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Status = c.String(),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(nullable: false),
                        Desscription = c.String(),
                        AssignedBy = c.Int(nullable: false),
                        AssignedTo = c.Int(),
                        Type = c.Int(),
                        order_number = c.Int(),
                    })
                .PrimaryKey(t => t.ID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Activities");
        }
    }
}
