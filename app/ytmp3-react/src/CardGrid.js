import { Card, CardContent, Grid } from "@mui/material";
import { styled } from "@mui/system";


const StyledCard = styled(Card)({
  height: "100%",
  display: "flex",
  margin: "25px",
  padding: "25px",
  flexDirection: "column",
  justifyContent: "space-between",
});

const CardGrid = (props) => {
  return (
    <Grid>
      {props.children.map((element, index) => (
        <Grid key={index} item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              {element}
            </CardContent>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGrid;
