// all the pieces in and map thru them, give them all a delete button, add a add modal
// ?

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Button from '@mui/material/Button';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export default function DesignEdit ({handleAssociatedPD, showAssocPD, handleRemovePiece}) {

    const handleDelete = (pd) => {
        handleRemovePiece(pd)
    }

    return (
        <ImageList sx={{ width: 500, height: 450 }}>
        <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">Pieces</ListSubheader>
        </ImageListItem>
        {showAssocPD.map((item) => (
        <ImageListItem key={item.id}>
            {console.log(item)}
          <img
            src={`${item.piece.image}?w=248&fit=crop&auto=format`}
            srcSet={`${item.piece.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.piece.name}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.piece.name}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`Remove ${item.piece.name}`}
                onClick={()=> handleDelete(item) }
              >
               <DeleteOutlinedIcon/>
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
    )
}