namespace ShopingApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class change : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Features", "ProductId", "dbo.Products");
            DropIndex("dbo.Features", new[] { "ProductId" });
            CreateTable(
                "dbo.FeatureProducts",
                c => new
                    {
                        Feature_Id = c.Int(nullable: false),
                        Product_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Feature_Id, t.Product_Id })
                .ForeignKey("dbo.Features", t => t.Feature_Id, cascadeDelete: true)
                .ForeignKey("dbo.Products", t => t.Product_Id, cascadeDelete: true)
                .Index(t => t.Feature_Id)
                .Index(t => t.Product_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.FeatureProducts", "Product_Id", "dbo.Products");
            DropForeignKey("dbo.FeatureProducts", "Feature_Id", "dbo.Features");
            DropIndex("dbo.FeatureProducts", new[] { "Product_Id" });
            DropIndex("dbo.FeatureProducts", new[] { "Feature_Id" });
            DropTable("dbo.FeatureProducts");
            CreateIndex("dbo.Features", "ProductId");
            AddForeignKey("dbo.Features", "ProductId", "dbo.Products", "Id", cascadeDelete: true);
        }
    }
}
